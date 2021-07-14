import anecdoteService from '../services/anecdotes'
const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  if (action.type === "VOTE") {
    return state.map(anecdoteObject => {
      if (anecdoteObject.id === action.data) {
        let newObject = { ...anecdoteObject }
        newObject.votes += 1
        return newObject
      }
      return anecdoteObject
    }).sort((a, b) => {
      if (b.votes > a.votes) return 1
      if (a.votes > b.votes) return -1
      return 0
    })
  }


  if (action.type === 'CREATE') {
    return state.concat(action.data)
  }
  if (action.type === 'INIT') {
    return action.data
  }
  return state
}


export const createNewAnecdote = (anecdote) => {
  return async dispatch =>  {
    const anecdote2= await anecdoteService.createNew({content:anecdote, votes: 0})
    dispatch({ type: 'CREATE',
    data: anecdote2})
   
  }
}

export const initializeAnecdotes = () => {
  return async dispatch =>  {
    const anecdote2= await anecdoteService.getAll()
    dispatch({ type: 'INIT',
    data: anecdote2})
   
  }

}
export const voteAnecdote = (anecdote) => {
  return async dispatch =>  {
    let na = {...anecdote}
    na.votes += 1
    await anecdoteService.voteAnecdote(na)
    dispatch({ type: 'VOTE', data: anecdote.id })
   
  }
  
}
export default reducer