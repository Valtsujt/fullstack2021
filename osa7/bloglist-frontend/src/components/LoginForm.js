

import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { connect } from 'react-redux'
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
                username: <input key="username" onChange={(event) => setUsername(event.target.value)} />
                <p />
                password: <input key="password" onChange={(event) => setPassword(event.target.value)} />

                <p />
                <button onClick={loginUser}>log in</button>
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