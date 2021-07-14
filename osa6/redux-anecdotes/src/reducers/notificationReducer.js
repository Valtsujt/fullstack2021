import { useDispatch } from 'react-redux'
const notificationReducer = (state = "initialState", action) => {
    

    if (action.type === 'ADD_NOTIFICATION') {
        return action.notification
    } else if (action.type === 'REMOVE_NOTIFICATION') {
        return ''
    }   
     return state
}

export const setNotification = (string, seconds) => {
    return async dispatch =>  {
        dispatch({
            type: 'ADD_NOTIFICATION',
            notification: string
        })
        setTimeout(() => {
        
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
          }, seconds * 1000)
      }
    
}
export default notificationReducer