const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogRouter.get('', async (request, response) => {
  let blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  await response.json(blogs)
})

blogRouter.post('/', async (request, response) => {



  
  const user = request.user
  const blog = new Blog( {user: user._id, ...request.body})

  result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  await response.status(201).json(result)

})

blogRouter.delete('/:id', async (request, response) => {
 
  const user = request.user
  result = await Blog.findById(request.params.id)
  if (result.user.toString() === user._id.toString()) {
    result.remove()
  }
  
  const mapped = user.blogs.filter(blog => {
    return blog.toString() !== result._id.toString()
  })
  user.blogs = mapped
  await user.save()
  await response.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {
  const blog = {
    name: request.body.name,
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
  }

  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(newBlog.toJSON())


})
module.exports = blogRouter