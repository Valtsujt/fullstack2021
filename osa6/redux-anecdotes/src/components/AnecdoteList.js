import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    const filter = props.filter

    const vote = (a) => {
        console.log(a)
        props.voteAnecdote(a)
        props.setNotification(`you voted '${a.content}'`, 5)
    }


    return (
        <div>
            {anecdotes.filter(anecdote => {

                return anecdote.content.toLowerCase().includes(filter.toLowerCase())
            }).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        anecdotes: state.anecdotes
    }
}
const mapDispatchToProps = {
    setNotification,
    voteAnecdote
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList