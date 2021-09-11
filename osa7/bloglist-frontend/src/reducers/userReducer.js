
import loginService from '../services/login'
import { setNotification, setError } from './notificationReducer'

export const logout = (event) => {
    return async dispatch => {

        event.preventDefault()
        window.localStorage.removeItem('user')
        dispatch({
            type: 'SET',
            loggedUsername: '',
            user: null,
            fullName: ''
        })
        dispatch(setNotification('logout succesfull', 5))
    }
}

export const login = (username, password) => {
    return async dispatch => {
        console.log('status')

        try {
            let userObj = await loginService.loginRequest(username, password)


            console.log('login')
            window.localStorage.setItem('user', JSON.stringify(userObj))
            dispatch({
                type: 'SET',
                loggedUsername: userObj.username,
                user: userObj.token,
                fullName: userObj.name
            })
            dispatch(setNotification('login succesfull', 5))
        } catch (e) {
            console.log('afds')
            dispatch(setError(e.response.data.error, 5))
        }

    }


}

export const fromStorage = () => {

    return async dispatch => {
        const tokenJson = window.localStorage.getItem('user')
        if (tokenJson) {

            const userObj = JSON.parse(tokenJson)
            dispatch({
                type: 'SET',
                loggedUsername: userObj.username,
                user: userObj.token,
                fullName: userObj.name
            })
        }
    }

}

const userReducer = (state = { loggedUsername: '', user: null, fullName: '' }, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    console.log(action.type)
    if (action.type === 'SET') {
        return {
            loggedUsername: action.loggedUsername,
            user: action.user,
            fullName: action.fullName
        }
    }




    return state
}

export default userReducer