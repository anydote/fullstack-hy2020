import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person }) => <div>{person.name} {person.number}</div>

const Persons = ({ persons }) => persons.map((person) => <Person person={person} />)

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <>
      <form>
          filter shown with: 
          <input 
            value={filter} 
            onChange={handleFilterChange}
          />
      </form>
    </>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input 
          value={newName} 
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: 
          <input 
            value={newNumber} 
            onChange={handleNumberChange}
          />
      </div>
      <p><button type="submit">add</button></p>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
        .then(initialPersons =>{
          setPersons(initialPersons)
        })
  }, [])

  const names = persons.map(p => p.name)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
    }
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

  const personsToShow = persons.filter(
    person => person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new entry</h2>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App