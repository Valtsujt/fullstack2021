import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = (user) => {
    const request = axios.get(baseUrl, {
        headers: {
            'Authorization': `bearer ${user}`
        }
    })
    return request.then(response => {
        console.log(response)
        return response.data
    })
}

const newBlog = async (author, title, url, token) => {
    const data = { title: title, author: author, url: url }
    const request = await axios.post(baseUrl, data, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
    return request.data
}

const editBlog = async (newBlog, token) => {
    const request = await axios.put(baseUrl + newBlog.id, newBlog, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
    return request.data
}

const deleteBlog = async (id, token) => {
    await axios.delete(baseUrl + id, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
}

const addComment = async (id, comment, token) => {
    const data = { comment: comment }
    await axios.post(baseUrl + id + '/comments', data, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
}
export default { getAll, newBlog, editBlog, deleteBlog, addComment }