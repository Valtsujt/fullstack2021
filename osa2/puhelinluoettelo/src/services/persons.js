import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:3001/persons')
}
const addPerson = (person) => {
    return axios.post('http://localhost:3001/persons', person)
    
}

const deletePerson = (person) => {
    return axios.delete('http://localhost:3001/persons/' + person.id)
}

const updatePerson = (person) => {
    return axios.put('http://localhost:3001/persons/' + person.id, person)
}
const functions = {getAll, addPerson, deletePerson, updatePerson}
export default functions