import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [weather, setweather] = useState({})
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        console.log('weathereffect')
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.capital}&units=m`)
            .then(response => {
                console.log('promise fulfilled')
                setweather(response.data)
            })
    }, [])

    if ('current' in weather) {
        return (
            <div>
                <h2>Weather in {props.country.capital}</h2>
                <p>temperature: {weather.current.temperature} Celsius</p>
                <img src={weather.current.weather_icons[0]} width="100px" ></img>
                <p>wind: {weather.current.wind_speed} Km/h direction {weather.current.wind_dir} </p>
            </div>

        )
    } else {
        return (
            <p></p>
        )

    }



}
const Countries = (props) => {
    console.log(props)
    if (props.countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (props.countries.length > 1) {
        return (
            props.countries.map(country => {
                return (
                    <div>
                        <p key={country.name}>{country.name} <button onClick={() => {
                            console.log(country.name)
                            props.setF(country.name)
                        }}
                        > show</button></p>

                    </div>

                )
            })
        )
    } else if (props.countries.length === 1) {
        const country = props.countries[0]
        console.log("country", country)
        return (
            <div>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h1>Languages</h1>
                {country.languages.map(language => {
                    console.log(language)
                    return <li key={language.name}>{language.name}</li>
                })}
                <p></p>
                <img src={country.flag} width="500px" ></img>
                <Weather country={country} />


            </div>
        )
    }
    return <p></p>
}
const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')


    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }
    return (
        <div>
            <div>
                filter countries<input onChange={handleFilterChange} value={filter}></input>
            </div>
            <Countries countries={countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))} setF={setFilter} />

        </div>
    )
}

export default App;
