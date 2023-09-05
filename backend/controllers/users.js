const UsersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')

const validationRules = [
    body('username').notEmpty().isString(),
    body('password').notEmpty().isString(),
    body('first_name').notEmpty().isString(),
    body('last_name').notEmpty().isString(),
    body('dob').notEmpty().isDate(),
]

UsersRouter.get('/', async (req, res) => {
    const users = await User.find({})

    res.json(users)
})

UsersRouter.post('/create-new', validationRules, async (req, res) => {
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

module.exports = UsersRouter