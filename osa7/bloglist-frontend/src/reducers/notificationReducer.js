const notificationReducer = (state = { notification: '', timeoutID: null, error: null }, action) => {

    console.log(action.type)
    if (action.type === 'ADD_NOTIFICATION') {
        if (state.timeoutId !== action.timeoutId) {
            clearTimeout(state.timeoutId)
        }
        return {
            notification: action.notification,
            timeoutId: action.timeoutId,
            error: action.error
        }
    } else if (action.type === 'REMOVE_NOTIFICATION') {
        return { notification: '', timeoutID: null, error: null }
    }
    return state
}

export const setNotification = (string, seconds) => {
    return async dispatch => {
        let timeoutId = setTimeout(() => {

            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, seconds * 1000)
        dispatch({
            type: 'ADD_NOTIFICATION',
            notification: string,
            timeoutId: timeoutId,
            error: false
        })

    }

}

export const setError = (string, seconds) => {
    return async dispatch => {
        let timeoutId = setTimeout(() => {

            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, seconds * 1000)
        dispatch({
            type: 'ADD_NOTIFICATION',
            notification: string,
            timeoutId: timeoutId,
            error: true
        })

    }

}
export default notificationReducer