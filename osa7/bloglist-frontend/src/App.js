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
import UserList from './components/UserList'
import BlogInfo from './components/BlogInfo'
import {
    //useParams,
    //useHistory,
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'
import UserInfo from './components/UserInfo'


const Menu = (props) => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link style={padding} to="/">Blogs</Link>
            <Link style={padding} to="/users">users</Link>
            {props.user.fullName} logged in <button onClick={props.logout}>logout</button>
        </div>
    )
}

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
                <LoginForm></LoginForm>
            </div>
        )
    }

    return (
        <div>



            <Router>
                <Menu user ={props.user} logout={props.logout}/>
                <Notification />
                <h1>Blogs</h1>
                <Switch>
                    <Route path="/users/:id">
                        <UserInfo />
                    </Route>
                    <Route path="/users">
                        <UserList />
                    </Route>
                    <Route path="/blogs/:id">
                        <BlogInfo />
                    </Route>
                    <Route path="/">
                        <Togglable buttonLabel='create new blog'>
                            <BlogForm></BlogForm>
                        </Togglable>
                        <BlogList />
                    </Route>


                </Switch>
            </Router>
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