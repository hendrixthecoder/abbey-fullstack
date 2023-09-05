const app = require('./app')
const morgan = require('morgan')
const { PORT } = require('./utils/config')
const logger = require('./utils/logger')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.listen(PORT, () => {
    logger.info(`🚀 - Server running at PORT: ${PORT}`)
})