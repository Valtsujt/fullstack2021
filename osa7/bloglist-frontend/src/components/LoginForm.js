

import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { connect } from 'react-redux'

import { TextField, Button } from '@material-ui/core'
const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginUser = (event) => {
        event.preventDefault()
        props.login(username, password)

    }
    return (
        <div>
            <h2>Log in to application</h2>
            <form>
                <TextField color="inherit" label="username" key="username" onChange={(event) => setUsername(event.target.value)} />
                <p />
                <TextField color="inherit" label="password" key="password" onChange={(event) => setPassword(event.target.value)} />

                <p />
                <Button color="inherit" variant="contained" onClick={loginUser}>log in</Button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    login,
}
const ConnectedLoginForm = connect(
    null,
    mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm