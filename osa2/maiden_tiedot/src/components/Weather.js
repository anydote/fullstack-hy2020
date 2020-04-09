import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "http://api.weatherstack.com/current"
const apiKey = process.env.REACT_APP_API_KEY

const Weather = ({ city }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get(`${apiUrl}?access_key=${apiKey}&query=${city}`).then((response) => {
          setWeather(response.data)
        }).catch((error) => {
            console.error(error)
        })
    }, [city])

    if (weather) {
        return (
            <div>
                <h2>Weather in {city}</h2>
                <p>Temperature: {weather.current.temperature} Celsius</p>
                <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
                <p>Wind: {weather.current.wind_speed} mph, direction {weather.current.wind_dir}</p>
            </div>
        );
    } else {
        return (<div></div>)
    }
};

export default Weather;