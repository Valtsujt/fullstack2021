const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const mongoose = require('mongoose')

const User = require('../models/users')
describe('user creation', () => {
    beforeEach(async () => {
        await User.deleteMany({})


    })


    test('user is created correclty', async () => {


        let newUser = {
            "username": "testi1",
            "password": "salasana1",
            "name": "nimi3"
        }
        const response1 = await api.get('/api/users')
        const len1 = (response1.body.length)
        await api.post('/api/users').send(newUser)
            .expect(201)

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(len1 + 1)



    })
    test('to short username is not created', async () => {


        let newUser = {
            "username": "tt",
            "password": "salasana1",
            "name": "nimi3"
        }
        await api.post('/api/users').send(newUser)
            .expect(400)



    })

    test('to short password is not created', async () => {


        let newUser = {
            "username": "ttssssss",
            "password": "sa",
            "name": "nimi3"
        }
        await api.post('/api/users').send(newUser)
            .expect(400)



    })

})

afterAll(() => {
    mongoose.connection.close()
})