const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')


console.log(process.env.DATABASE_PASSWORD)
let mongoUrl
if (process.env.NODE_ENV === 'test') {
  mongoUrl = `mongodb+srv://fullstack:${process.env.DATABASE_PASSWORD}@cluster0.sburk.mongodb.net/test-database?retryWrites=true&w=majority`
} else {
  mongoUrl = `mongodb+srv://fullstack:${process.env.DATABASE_PASSWORD}@cluster0.sburk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs',middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login',loginRouter)

if (process.env.NODE_ENV === 'integtest') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
const PORT = 3003

const server = http.createServer(app)
if (process.env.NODE_ENV !== 'test') { 
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  
}

module.exports = app