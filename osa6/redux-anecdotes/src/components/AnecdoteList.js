import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    
    const vote = (a) => {
        console.log(a)
        dispatch(voteAnecdote(a))
        dispatch(setNotification(`you voted '${a.content}'`, 5))
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

export default AnecdoteList