import axios from 'axios'
import { useEffect, useState } from 'react'
// import './App.css'

function App() {
  const [filter, setFilter] = useState('')
  const [paises, setPaises] = useState([])
  const [weather, setWeather] = useState([])
  const api_key = import.meta.env.VITE_SOME_KEY;
 
// ($env:VITE_SOME_KEY="54l41n3n4v41m34rv0") -and (npm run dev) // Para Windows vscode

useEffect(() => {
    if (filter) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          let obj = response.data.map((pais, indice) => {
            return {indice: indice, nombre: pais.name.common, capital: pais.capital, area: pais.area, languages: pais.languages, bandera: pais.flags}
          })
          let search = obj.filter(pais => pais.nombre.toLowerCase().includes(filter.toLowerCase()))
          setPaises(search)
          
        })
        .catch(error => {
          console.log("errorrr     "+error)
        })
    }
  }, [filter])

  const climate = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${paises[0].capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.log("errorrr     "+error)
      })
  }

  useEffect(() => {
    if(paises.length >= 1){
      climate()
    }
  }, [ paises])

  const handleChangeFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const handleBotton = (nombrePais) => {
    setPaises(paises.filter(pais => pais.nombre === nombrePais))
  }

  const Respuesta = () => {
    if(paises.length > 10){
      return <p>Too many matches, specify another filter</p>
    }else if(paises.length > 1 && paises.length <= 10){
      return (
        <>
        {paises.map(pais => (
          <div key={pais.nombre}>
            <span >{pais.nombre} </span>
            <button onClick={() => handleBotton(pais.nombre)}> show</button>
          </div>
        )
        )}
        </>
      )
    }else if(paises.length === 1){
      return (<>
          {paises.map(pais =>
            <div key={pais.indice}>
              <h1>{pais.nombre}</h1>
              <p>capital {pais.capital}</p>
              <p>area {pais.area}</p>
              <h2>languages</h2>
              <ul>
                {Object.values(pais.languages).map((idioma) => 
                  <li key={idioma}>{idioma}</li>
                )}
              </ul>
              <img src={pais.bandera.png} alt="bandera" width="100" height="100"/>
              <h2>Weather in {pais.capital}</h2>
              <p>temperature: {weather.main.temp} °C</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          )}
      </>)
    }
  }

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleChangeFilter} />
      </div>
     <Respuesta />
    </>
  )
}

export default App
