import React from 'react';
import Weather from './Weather';

const CountryDisplay = ({
	filter,
	countries,
	chosenCountry,
	handleCountryClick
}) => {
	const filteredCountries = countries.filter(
		country => country.name.toLowerCase().includes(filter.toLowerCase())
	)

	if (chosenCountry !== "") {
		const theCountry = countries.find(c => c.name === chosenCountry)
		return <SingleCountryDisplay country={theCountry} />
	}

	if (filteredCountries.length > 10) {
		return "Too many matches, specify another filter"
	} else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
		return <CountryList countries={filteredCountries} handleCountryClick={handleCountryClick} />
	} else if (filteredCountries.length === 1) {
		return <SingleCountryDisplay country={filteredCountries[0]} />
	} else {
		return ""
	}
}

const CountryList = ({ countries, handleCountryClick }) => {
	return (
		countries.map((c) => 
			<Country
				key={c.name}
				name={c.name} 
				handleCountryClick={handleCountryClick} 
			/>
		)
	)
}

const Country = ({ name, handleCountryClick }) => {
	return (
		<div>
			{name}
			<button 
				key={name}
				data-country={name} 
				onClick={handleCountryClick}>
				show
			</button>
		</div>
	)
}

const SingleCountryDisplay = ({ country }) => (
	<>
		<h1>{country.name}</h1>
		<div>capital {country.capital}</div>
		<div>population {country.population}</div>
		<h2>Languages</h2>
		<ul>
			{country.languages.map(language =>
				<li key={language.iso639_1}>
					{language.name}
				</li>
			)}
		</ul>
		<img src={country.flag} alt="" width="200" />
		<Weather city={country.capital} />
	</>
)

export default CountryDisplay;