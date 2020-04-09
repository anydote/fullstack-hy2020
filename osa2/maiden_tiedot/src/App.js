import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import CountryDisplay from './components/CountryDisplay'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ chosenCountry, setChosenCountry ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setChosenCountry('')
  }

  const handleCountryClick = (event) => {
    setChosenCountry(event.target.dataset.country)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <CountryDisplay 
        countries={countries} 
        filter={filter} 
        chosenCountry={chosenCountry}
        handleCountryClick={handleCountryClick}
      />
    </div>
  );
}

export default App;
