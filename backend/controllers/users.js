const UsersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const { getTokenFrom } = require('../utils/config')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
require('dotenv').config()

const validationRulesCreate = [
    body('username').notEmpty().isString(),
    body('password').notEmpty().isString(),
    body('first_name').notEmpty().isString(),
    body('last_name').notEmpty().isString(),
    body('dob').notEmpty(),
]

const validationRulesEdit = [
    body('username').isString(),
    body('password').isString(),
    body('first_name').isString(),
    body('last_name').isString(),
]

UsersRouter.get('/:username', async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if(!decodedToken.id){
        res.status(401).json({ error: "Token Invalid" })
    }

    if(!(decodedToken.username === req.params.username)){
        res.status(401).json({ message: "Action Unauthorized" })
    }

    const username = req.params.username
    const user = await User.findOne({ username })

    res.json(user)
})

UsersRouter.post('/create-new', validationRulesCreate, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    
    const { username, password, first_name, last_name, dob } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        first_name,
        last_name,
        dob,
        passwordHash
    })

    const savedUser = await user.save()
    
    res.status(201).json(savedUser)
})

UsersRouter.put('/edit', validationRulesEdit, async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if(!decodedToken.id){
        req.status(401).json({ message: "Token Invalid" })
    }

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const saltRounds = 10

    const updatedFields = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: await bcrypt.hash(req.body.password, saltRounds)
    }

    try {        
        const updatedUser = await User.findOneAndUpdate(
            { username: decodedToken.username },
            { $set: updatedFields },
            { new: true }
        )
    
        if(!updatedUser) {
            return res.json(404).json({ message: 'User not found' })
        }
    
        res.json(updatedUser)

    } catch (error) {
        logger.error(`Error updating user: ${error.message}`)
        res.status(500).json({ message: 'An error occured, try later!' })
    }
})

module.exports = UsersRouter