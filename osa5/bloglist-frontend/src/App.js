import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')

    const [loggedUsername, setLoggedUsername] = useState('')
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const tokenJson = window.localStorage.getItem('user')
        if (tokenJson) {
            const userObj = JSON.parse(tokenJson)
            setFullName(userObj.name)
            setUser(userObj.token)
            setLoggedUsername(userObj.username)
        }
        if (user) {
            try {
                blogService.getAll(user).then(blogs => {
                    console.log(blogs)
                    setBlogs(blogs)
                }
                )
            } catch (error) {
                setErrorMessage(error.response.data.error)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }

        }

    }, [user])

    const logout = async (event) => {
        event.preventDefault()
        console.log('logout')
        setFullName('')
        setUser(null)
        setLoggedUsername('')

        window.localStorage.removeItem('user')
        setMessage('logout succesfull')
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const login = async (event) => {

        event.preventDefault()
        let userObj
        try {
            userObj = await loginService.loginRequest(username, password)
        } catch (error) {
            console.log(error.response.data.error)
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }

        console.log('login')
        setFullName(userObj.name)
        setUser(userObj.token)
        setLoggedUsername(userObj.username)
        window.localStorage.setItem('user', JSON.stringify(userObj))
        setMessage('login succesfull')
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const createBlog = async (event, author, title, url) => {
        event.preventDefault()
        let blog
        try {
            blog = await blogService.newBlog(author, title, url, user)
        } catch (error) {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }
        console.log(blog)
        const b = await blogService.getAll(user)

        setBlogs(b)

        setMessage(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const addLike = async (blog) => {
        const newBlog = blog
        newBlog.likes = blog.likes + 1
        console.log(blog)
        console.log(newBlog)
        try {
            const responseData = await blogService.editBlog(newBlog, user)
            setBlogs(blogs.map(blog => blog.id !== newBlog.id ? blog : responseData))
        } catch (error) {
            console.log(error)
            if (error.response) {
                setErrorMessage(error.response.data.error)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }

            return
        }

    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}?`)) {


            try {
                console.log(blog)
                console.log(blog.id)
                await blogService.deleteBlog(blog.id, user)
                setBlogs(blogs.filter(b => b.id !== blog.id))
            } catch (error) {
                console.log(error)
                if (error.response) {
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                }
            }
        }
    }
    const Notification = ({ message }) => {
        if (message === null) {
            return null
        }

        return (
            <div className="notification">
                {message}
            </div>
        )
    }

    const Error = ({ message }) => {
        if (message === null) {
            return null
        }

        return (
            <div className="error">
                {message}
            </div>
        )
    }
    if (user === null) {
        return (
            <div>
                <Notification message={message} />
                <Error message={errorMessage} />
                <h2>Log in to application</h2>
                <form>
                    username: <input key="username" onChange={(event) => setUsername(event.target.value)} />
                    <p />
          password: <input key="password" onChange={(event) => setPassword(event.target.value)} />

                    <p />
                    <button onClick={login}>log in</button>
                </form>




            </div>
        )
    }

    return (
        <div>
            <Notification message={message} />
            <Error message={errorMessage} />
            <h1>Blogs</h1>
            <p>{fullName} logged in <button onClick={logout}>logout</button></p>


            <Togglable buttonLabel='create new blog'>

                <BlogForm createBlog={createBlog}></BlogForm>

            </Togglable>
            {blogs.sort((a, b) => {
                if (b.likes > a.likes) return 1
                if (a.likes > b.likes) return -1
                return 0
            }).map(blog => {
                console.log(blog.user.username, loggedUsername)
                if (blog.user.username === loggedUsername) {
                    return (
                        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
                    )
                } else {
                    return (
                        <Blog key={blog.id} blog={blog} addLike={addLike} />
                    )
                }

            })}
        </div>
    )
}


export default App