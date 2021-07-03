const Blog = require('../models/blog')
const blogRouter = require('express').Router()


blogRouter.get('', async (request, response) => {
  let blogs = await Blog.find({})
  await response.json(blogs)
})

blogRouter.post('/', async (request, response) => {



  const blog = new Blog(request.body)

  result = await blog.save()
  await response.status(201).json(result)

})

blogRouter.delete('/:id', async (request, response) => {
  result = await Blog.findByIdAndDelete(request.params.id)
  await response.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {
  const blog = {
    name: request.body.name,
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes
  }

  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(newBlog.toJSON())


})
module.exports = blogRouter