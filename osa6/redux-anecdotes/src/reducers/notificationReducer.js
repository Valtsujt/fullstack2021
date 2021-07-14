const notificationReducer = (state = {notification: '', timeoutID : null}, action) => {
    

    if (action.type === 'ADD_NOTIFICATION') {
        if(state.timeoutId !== action.timeoutId) {
            clearTimeout(state.timeoutId)
        }
        return {
            notification: action.notification,
            timeoutId: action.timeoutId
        }
    } else if (action.type === 'REMOVE_NOTIFICATION') {
        return {notification: '', timeoutID : null}
    }   
     return state
}

export const setNotification = (string, seconds) => {
    return async dispatch =>  {
        let timeoutId = setTimeout(() => {
        
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
          }, seconds * 1000)
        dispatch({
            type: 'ADD_NOTIFICATION',
            notification: string,
            timeoutId: timeoutId
        })
        
      }
    
}
export default notificationReducer