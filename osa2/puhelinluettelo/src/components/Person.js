import React from 'react'

const Person = ({ person, handlePersonClick }) => {
  return (
    <div>
      {person.name} {person.number}
      <button
        data-id={person.id}
        data-name={person.name}
        onClick={handlePersonClick}>
        delete
      </button>
    </div>
  )
}

const Persons = ({ persons, filter, handlePersonClick }) => {
  const personsToShow = persons.filter(
    person => person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const personRows = personsToShow.map((person) => {
    return (
      <li key={person.id}>
        <Person person={person} handlePersonClick={handlePersonClick}/>
      </li>
    )
  })    

  return (
    <ul>
      {personRows}
    </ul>
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

export { Persons, PersonForm }