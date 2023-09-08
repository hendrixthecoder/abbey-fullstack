const User = require('../models/User')
const { getTokenFrom } = require('../utils/config')

const FriendsRouter = require('express').Router()

FriendsRouter.get('/:username', async (req,res) => {
    
    const user = await User.findOne({ username: req.params.username }).populate('friends')
    if(!user) {
        return res.status(404).json({ message: 'User not found!' })
    }

    res.json(user.friends)
})

module.exports = FriendsRouter