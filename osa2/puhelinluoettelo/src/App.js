import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.hb}>
            <div>
                name: <input onChange={props.hnc} />
            </div>
            <div>
                number: <input onChange={props.hnumc} />
            </div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    )
}

const Filter = (props) => {
    return (
        <div>
            filter shown with<input onChange={props.handleFilterChange} ></input>
        </div>
    )
}

const Persons = (props) => {
    return (
        <div>
            {props.persons
                .filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
                .map(person => {
                    return <p key={person.name} >{person.name} : {person.number}</p>

                }

                )}
        </div>

    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleButton = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)) {
            window.alert(newName + "is already added to phonebook")
        } else {
            setPersons(persons.concat({
                name: newName,
                number: newNumber
            }))
        }

        console.log(persons)
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    useEffect(() => {
        console.log('effect')
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
          })
      }, [])
    
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>

            <PersonForm hb={handleButton} hnc={handleNameChange} hnumc={handleNumberChange} />
            <h2>Numbers</h2>

            <Persons persons={persons} filter={filter} />

        </div>
    )

}

export default App