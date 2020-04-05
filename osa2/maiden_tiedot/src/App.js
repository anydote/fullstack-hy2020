import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <>
      <form>
          find countries
          <input 
            value={filter} 
            onChange={handleFilterChange}
          />
      </form>
    </>
  )
}

const CountryDisplay = ({ countries, filter }) => {
  let filteredCountries = countries.filter(
    country => country.name.toLowerCase().includes(filter.toLowerCase())
  )
  
  if (filteredCountries.length > 10) {
    return "Too many matches, specify another filter"
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return <CountryList countries={filteredCountries} />
  } else if (filteredCountries.length === 1) {
    return <SingleCountryDisplay country={filteredCountries} />
  } else {
    return ""
  }
}

const CountryList = ({ countries }) => countries.map((c) => <div>{c.name}</div>)

const SingleCountryDisplay = ({ country }) => {
  return ""
}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <CountryDisplay countries={countries} filter={filter} />
    </div>
  );
}

export default App;
