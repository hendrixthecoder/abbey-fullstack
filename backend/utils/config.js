require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.MONGODB_URI

const getTokenFrom = request => {
    const authorization = request.get('authorization')
  
    if(authorization && authorization.startsWith('Bearer')) {
      return authorization.replace('Bearer ', '')
    }
  
    return null
}

module.exports = {
    PORT,
    MONGODB_URI,
    getTokenFrom
}