const User = require('../models/users')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
const tokenExtractor = (request, response, next) => {

    auth = request.get('authorization')

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        request['token'] = auth.substring(7)
    }

    next()
}

const userExtractor = async (request, response, next) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (user) {
        request['user'] = user
    }

    next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }