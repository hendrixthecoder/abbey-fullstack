const User = require('../models/User')
const LoginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { body, validationResult } = require('express-validator')

const validationRules = [
    body('username').notEmpty().isString(),
    body('password').notEmpty().isString(),
]

LoginRouter.post('/', validationRules, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { username, password } = req.body

    const user = await User.findOne({ username })
    const userExists = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && userExists)) {
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const userForToken = {
        username,
        id: user._id
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60*60 }
    )

    res.status(200).send({ token, username, name: `${user.first_name} ${user.last_name}` })
}) 

module.exports = LoginRouter