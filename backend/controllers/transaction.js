const Transaction = require('../models/Transaction.js')
const User = require('../models/User.js')
const TransactionRouter = require('express').Router()
const { body, validationResult } = require('express-validator')
const logger = require('../utils/logger.js')
const { getTokenFrom } = require('../utils/config.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const validationRules = [
    body('sender').notEmpty().isString(),
    body('receiver').notEmpty().isString(),
    body('amount').notEmpty().isNumeric(),
    body('beneficiary').isBoolean()
]

TransactionRouter.post('/new', validationRules, async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

    if(!decodedToken.id) {
        return res.status(401).json({ error: "Token Invalid" })
    }

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const { receiver, amount, beneficiary } = req.body
        const checkedSender = await User.findOne({ username: decodedToken.username })
        const checkedReciever = await User.findOne({ username: receiver })
    
        if(!checkedSender || !checkedReciever) {
            return res.status(404).json({ message: 'User not found!' })
        }

        if(sender === checkedReciever.username) {
            return res.status(400).json({ message: 'Invalid action.' })
        }

        if(checkedSender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds.' })
        }
    
        const newTransaction = new Transaction({
            amount,
            date: new Date(),
            sender: checkedSender._id,
            reciever: checkedReciever._id
        })

        //save the new transaction
        await newTransaction.save()

        //decrement sender balance
        checkedSender.balance -= parseFloat(amount)

        const isAdded = checkedSender.friends.includes(checkedReciever._id)

        // check if the user already has the receiver in their beneficiary, if not add them
        if(beneficiary && !isAdded) {
            checkedSender.friends = checkedSender.friends.concat(checkedReciever._id)
        }

        //save sender information
        await checkedSender.save()
        
        //increment beneficiary balance and save their information
        checkedReciever.balance += parseFloat(amount)
        await checkedReciever.save()
    
        res.status(200).json({ message: 'Funds sent successfully!', checkedSender })
        
    } catch (error) {
        logger.error(`Transaction creation error: ${error.message}`)
        res.status(500).json({ message: 'An error has occured' })
    }

})

TransactionRouter.get('/', async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if(!decodedToken.id){
        return res.status(401).json({ error: "Token Invalid" })
    }

    const user = await User.findOne({ username: decodedToken.username })

    if(!user){
        res.status(404).json({ message: 'User not found' })
    }

    const transactions = await Transaction.find({ 
        $or: [
            { sender: user._id }, { reciever: user._id }
        ] 
    })
    .populate('sender', 'username')
    .populate('reciever', 'username')
    
    res.json(transactions)
})



module.exports = TransactionRouter

