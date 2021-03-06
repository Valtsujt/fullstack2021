
import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    console.log("##################",content)
    const response = await axios.post(baseUrl, content)
    return response.data
}

const voteAnecdote = async (newAnecdote) => {
    const response = await axios.put(baseUrl + "/"  + newAnecdote.id, newAnecdote)
    return response
}
export default {
    getAll,
    createNew,
    voteAnecdote
}