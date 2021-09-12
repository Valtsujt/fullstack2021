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
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { AppBar, Toolbar, Button, Tab } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
    //useParams,
    //useHistory,
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'
import UserInfo from './components/UserInfo'
// const darkTheme = createTheme({
//     palette: {
//         type: 'dark',
//     },
// })

const Menu = (props) => {
    return (
        <AppBar color="default" position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    Blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                    users
                </Button>
                <Tab label={props.user.fullName + ' logged in'} disabled />
                <Button color="secondary" variant="contained" onClick={props.logout}>logout</Button>
            </Toolbar>
        </AppBar>
    )
}

const App = (props) => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    )

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
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Container>
                    <Notification />
                    <LoginForm></LoginForm>
                </Container>
            </MuiThemeProvider >
        )
    }

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />

            <Container className="container2">



                <Router>
                    <Menu user={props.user} logout={props.logout} />
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
                            <Togglable buttonLabel='create new blog' >
                                <BlogForm></BlogForm>
                            </Togglable>
                            <BlogList />
                        </Route>


                    </Switch>
                </Router>
            </Container>
        </MuiThemeProvider >
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