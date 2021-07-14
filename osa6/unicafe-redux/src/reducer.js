const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let newState = {...state}
      newState.good = newState.good + 1
      return newState
    case 'OK':
      let newState2 = {...state}
      newState2.ok = newState2.ok + 1
      return newState2
    case 'BAD':
      let newState3 = {...state}
      newState3.bad = newState3.bad + 1
      return newState3
    case 'ZERO':
      let zerostate = {
        good: 0,
        ok: 0,
        bad: 0
      }
      
      return zerostate
    default: return state
  }
  
}

export default counterReducer