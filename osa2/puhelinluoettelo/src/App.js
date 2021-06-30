import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
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
                    return <p key={person.name} >{person.name} : {person.number} <button onClick={() => props.deleteFunc(person)}>delete</button></p>

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
            const person = persons.find(person => person.name === newName)

            if (window.confirm(
                `${person.name} is already added to phonebook, replace the old number with a new one?`)) {
                console.log("confirmed")
                if ('id' in person === false) {
                    personsService.getAll().then(response => {
                        personsService.updatePerson({
                            ...response.data
                                .find(element => element.name === person.name), number: newNumber
                        })
                            .then(
                                setPersons(persons.filter(p => p.name !== newName).concat({
                                    name: newName,
                                    number: newNumber

                                }))
                            )
                    })
                } else {
                    personsService.updatePerson({ ...person, number: newNumber })
                    .then(
                        setPersons(persons.filter(p => p.name !== newName).concat({
                            name: newName,
                            number: newNumber

                        }))
                    )
                }


            }
        } else {
            personsService.addPerson({
                name: newName,
                number: newNumber
            }).then(
                setPersons(persons.concat({
                    name: newName,
                    number: newNumber

                }))
            )

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

    const personDelete = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            if ('id' in person) {
                personsService.deletePerson(person).then(
                    setPersons(persons.filter(p => p.name !== person.name))
                )
            } else {
                personsService.getAll().then(response => {
                    personsService.deletePerson(response.data
                        .find(element => element.name === person.name))
                        .then(
                            setPersons(persons.filter(p => p.name !== person.name))
                        )
                })

            }

        }

    }

    const getPersons = () => {
        return personsService.getAll()
            .then(response => {
                console.log('promise fulfilled222')
                setPersons(response.data)
            })
    }
    useEffect(() => {
        console.log('effect')
        getPersons()
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>

            <PersonForm hb={handleButton} hnc={handleNameChange} hnumc={handleNumberChange} />
            <h2>Numbers</h2>

            <Persons persons={persons} filter={filter} deleteFunc={personDelete} />

        </div>
    )

}

export default App