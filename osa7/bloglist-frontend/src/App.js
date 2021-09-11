import React, { useEffect } from 'react'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification, setError } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import { logout, fromStorage } from './reducers/userReducer'
import BlogList from './components/BlogList'
const App = (props) => {

    useEffect(() => {
        props.fromStorage()
    }, [])
    useEffect(() => {
        if (props.user.user) {
            try {
                props.initializeBlogs(props.user.user)
            } catch (error) {
                props.setError(error.response.data.error, 5)
            }
        }
    }, [props.user])

    if (props.user.user === null) {
        return (
            <div>
                <Notification />
                <LoginForm></LoginForm>
            </div>
        )
    }

    return (
        <div>
            <Notification />
            <h1>Blogs</h1>
            <p>{props.user.fullName} logged in <button onClick={props.logout}>logout</button></p>
            <Togglable buttonLabel='create new blog'>
                <BlogForm></BlogForm>
            </Togglable>
            <BlogList />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        notification: state.notification,
        user: state.user
    }
}
const mapDispatchToProps = {
    setNotification,
    setError,
    initializeBlogs,
    logout,
    fromStorage
}
const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp