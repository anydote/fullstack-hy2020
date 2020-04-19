import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import { Persons, PersonForm } from './components/Person'
import Notification from './components/Notification'

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

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState({
    content: null, type: ''
  })

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons =>{
          setPersons(initialPersons)
        })
        .catch(error => {
          console.error(error)
        })
  }, [])

  const names = persons.map(p => p.name)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (names.includes(newName)) {
      if (window.confirm(
        `${newName} is already added to the phonebook.
        Do you want to replace the old number with a new one?`
      )) {
        const personToChange = persons.find(p => p.name === newName)
        const id = Number(personToChange.id)
        const changedPerson = { ...personToChange, number: newNumber }

        personService
          .update(id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setNotification({
                content:`Updated ${newName}`,
                type: 'success'
              })
              setTimeout(() => {
                setNotification({content: null, type:''})
              }, 2000)
            })
            .catch(error => {
              let copy = persons.filter((person) => person.id !== id)
              setPersons(copy)
              setNotification({
                content:`Information about ${newName} has already been deleted from the server`,
                type: 'fail'
              })
              setTimeout(() => {
                setNotification({content: null, type:''})
              }, 2000)
            })
      }
    } else {
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification({
              content:`Added ${newName}`,
              type: 'success'
            })
            setTimeout(() => {
              setNotification({content: null, type:''})
            }, 2000)
          })
          .catch((error) => (console.log(error)))
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

  const handlePersonClick = (event) => {
    event.preventDefault()
    const idToRemove = Number(event.target.dataset.id)
    const nameToRemove = event.target.dataset.name
    if (window.confirm(`Delete ${nameToRemove}?`)) {
      let copy = persons.filter((person) => person.id !== idToRemove)
      setPersons(copy)
      setNewName('')
      setNewNumber('')

      personService
        .remove(idToRemove)
          .then(()  => {
            setNotification({
              content:`Deleted ${nameToRemove}`,
              type: 'success'
            })
            setTimeout(() => {
              setNotification({content: null, type:''})
            }, 2000)
          })
          .catch(error => {
            setNotification({
              content:`The person ${nameToRemove} has already been deleted from the server`,
              type: 'success'
            })
            setTimeout(() => {
              setNotification({content: null, type:''})
            }, 2000)
          })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

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

      <Persons 
        persons={persons} 
        filter={filter} 
        handlePersonClick={handlePersonClick} 
      />
    </div>
  )
}

export default App