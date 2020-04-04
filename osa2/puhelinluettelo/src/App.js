import React, { useState } from 'react'

const Person = ({ person }) => <div>{person.name}</div>

const Phonebook = ({ persons }) => persons.map((person) => <Person person={person} />)

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1,
    }

    let names = persons.map(p => p.name)
    
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        name: 
        <input 
          value={newName} 
          onChange={handleNameChange}
        />
        <p><button type="submit">add</button></p>
      </form>
      <h2>Numbers</h2>
      <Phonebook persons={persons} />
    </div>
  )
}

export default App