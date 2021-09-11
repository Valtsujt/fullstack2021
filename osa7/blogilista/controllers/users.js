const User = require('../models/users')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    let users = await User.find({}).populate('blogs')
    users = users.map(user => {
        return {
            username: user.username,
            name: user.name,
            id: user.id,
            blogs: user.blogs

        

        }
    })
    await response.json(users)
})

userRouter.post('/', async (request, response) => {


    if (request.body.password.length < 3) {
        throw {name : "ValidationError", message : "password too short"}
    }
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)


    const user = new User({
        username: request.body.username,
        name: request.body.name,
        passwordHash: passwordHash
    })
    result = await user.save()
    
    await response.status(201).json({
        username: result.username,
        name: result.name,
        id: result.id
    

    })

})

userRouter.delete('/:id', async (request, response) => {
    result = await User.findByIdAndDelete(request.params.id)
    await response.status(204).end()

})


module.exports = userRouter