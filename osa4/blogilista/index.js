const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const blogRouter = require('./controllers/blogs')


console.log(process.env.DATABASE_PASSWORD)
const mongoUrl = `mongodb+srv://fullstack:${process.env.DATABASE_PASSWORD}@cluster0.sburk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})