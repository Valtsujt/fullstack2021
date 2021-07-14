import React from 'react'
import { connect } from 'react-redux'
import { createNewAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

    const createNew = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createNewAnecdote(anecdote)
        props.setNotification(`you created '${anecdote}'`, 5)



    }


    return (
        <form onSubmit={createNew}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}
const mapDispatchToProps = {
    setNotification,
    createNewAnecdote
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm