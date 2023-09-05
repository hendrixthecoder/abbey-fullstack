require('express-async-errors')
const express = require('express')
const app = express()
const UsersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const LoginRouter = require('./controllers/login')

logger.info(`Connecting to MongoDB at ${MONGODB_URI}`)

mongoose.connect(MONGODB_URI)
    .then(() => logger.info('🚀 - Successfully connected to MongoDB'))
    .catch((error) => logger.error(`💣 - Error connecting to MongoDB: ${error.message}`))

//Middlewares
app.use(middleware.requestLogger)
app.use(express.json())

//Routes
app.use('/api/login', LoginRouter)
app.use('/api/users', UsersRouter)

app.use(middleware.unknownEndpoint) // Catch wrong endpoints
// app.use(middleware.errorHandler) Custom error handling

module.exports = app