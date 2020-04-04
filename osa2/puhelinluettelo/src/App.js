import React, { useState } from 'react'

const Person = ({ person }) => <div>{person.name} {person.number}</div>

const Phonebook = ({ persons }) => persons.map((person) => <Person person={person} />)

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    let names = persons.map(p => p.name)

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <Phonebook persons={persons} />
    </div>
  )
}

export default App