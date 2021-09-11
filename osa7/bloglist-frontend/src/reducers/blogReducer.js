import blogService from '../services/blogs'
import { setNotification, setError } from './notificationReducer'

const blogReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    console.log(action.type)
    if (action.type === 'CREATE') {
        return state.concat(action.data)
    }
    if (action.type === 'INIT') {
        return action.data
    }
    if (action.type === 'DELETE') {
        return state.filter(b => b.id !== action.id)
    }

    if (action.type === 'VOTE') {
        return state.map(blogObject => {
            if (blogObject.id === action.data) {
                let newObject = { ...blogObject }
                newObject.votes += 1
                return newObject
            }
            return blogObject
        }).sort((a, b) => {
            if (b.votes > a.votes) return 1
            if (a.votes > b.votes) return -1
            return 0
        })
    }



    return state
}





export const createNewBlog = (author, title, url, user) => {
    return async dispatch => {
        try {
            const blog2 = await blogService.newBlog(author, title, url, user)
            dispatch({
                type: 'CREATE',
                data: blog2
            })
            dispatch(setNotification(`a new blog ${title} by ${author} added`, 5))
        } catch (e) {
            dispatch(setError(e.response.data.error, 5))
        }

    }
}

export const initializeBlogs = (user) => {
    return async dispatch => {
        try {
            const blog2 = await blogService.getAll(user)
            dispatch({
                type: 'INIT',
                data: blog2
            })
        } catch (e) {
            dispatch(setError(e.response.data.error, 5))
        }
    }

}
export const deleteBlog = (id, user) => {
    return async dispatch => {
        try {
            await blogService.deleteBlog(id, user)
            dispatch({
                type: 'DELETE',
                id: id
            })

            dispatch(setNotification('Blog deleted sucesfully', 5))
        } catch (e) {
            dispatch(setError(e.response.data.error, 5))
        }
    }
}
export const voteBlog = (blog, user) => {
    return async dispatch => {
        const newBlog = blog
        newBlog.likes = blog.likes + 1
        console.log(blog)
        console.log(newBlog)
        await blogService.editBlog(newBlog, user)
        dispatch({ type: 'VOTE', data: blog.id })

    }

}

export default blogReducer