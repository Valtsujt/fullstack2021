import axios from 'axios'
const baseUrl = '/api/login'

const loginRequest = async (username, password) => {

    const request = await axios.post(baseUrl, {
        username: username,
        password: password
    })
    return request.data


}

export default { loginRequest }