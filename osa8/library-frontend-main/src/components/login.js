import React, { useState } from 'react'
import {  useMutation } from '@apollo/client'


import { LOGIN } from '../queries'

const Login = (props) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [ login ] = useMutation(LOGIN, {
  })
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('Login')
    let res = await login({ variables: {username : name,password:password}})
    console.log(res.data.login.value)
    localStorage.setItem('user-token', res.data.login.value)
    props.setToken(res.data.login.value)
  }


  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
        password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
