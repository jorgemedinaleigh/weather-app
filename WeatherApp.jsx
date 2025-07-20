import React, {useState} from 'react'

export const WeatherApp = () => {

  const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = '5861c763b926a866b80c704ce14b60d5'

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const handleSearch = (event) => {
    setCity(event.target.value)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    if(city.length > 0) fetchWeather()
  }

  const fetchWeather = async () => {
    try{
      const response = await fetch(baseURL + '?q=' + city + '&appid=' + API_KEY + '&units=metric')
      const data = await response.json()
      setWeather(data)
    }
    catch(error){
      console.error('Error fetching weather data:', error)
    }
  }

  return (
    <>
      <div className='container'>
        <h1>Weather</h1>
        <form onSubmit={onSubmit}>
          <input type="text" className="mr-2" value={city} onChange={handleSearch}/>
          <button type="submit">Search</button>
        </form>
        {
          weather && (
            <div className='card'>
              <div className='card-body bg-secondary'>
                <img src={'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'}/>
                <h2>{weather.name}, {weather.sys.country}</h2>
                <p>Temp: {weather.main.temp}°C</p>
                <p>Conditions: {weather.weather[0].description}</p>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}
