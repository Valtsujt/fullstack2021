import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createNewAnecdote(anecdote))
        dispatch(setNotification(`you created '${anecdote}'`), 5)
        


    }


    return (
        <form onSubmit={createNew}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm