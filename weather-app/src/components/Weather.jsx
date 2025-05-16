import React, { useEffect, useState } from 'react';
import axios from 'axios'; // ← Import axios
import './Weather.css';

import search_icon from '../assets/search.png'
import clear_day from '../assets/clear_day.png'
import clear_night from '../assets/clear_night.png'
import cloudy from '../assets/cloudy.png'
import cloudy_day from '../assets/cloudy_day.png'
import cloudy_night from '../assets/cloudy_night.png'
import humidity from '../assets/humidity.png'
import mist from '../assets/mist.png'
import rain_day from '../assets/rain_day.png'
import rain_night from '../assets/rain_night.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import sunrise from '../assets/sunrise.png'
import sunset from '../assets/sunset.png'
import thunder from '../assets/thunder.png'
import wind from '../assets/wind.png'
import pressure from '../assets/pressure.png'
import visibility from '../assets/visibility.png'

const pickImageById = (iconCode) => {
  switch(iconCode){
    case '01d': return clear_day;
    case '01n': return clear_night;
    case '02d': return cloudy_day;
    case '02n': return cloudy_night;
    case '03d':
    case '03n':
    case '04d':
    case '04n': return cloudy; 
    case '09d':
    case '09n': return rain;
    case '10d': return rain_day;
    case '10n': return rain_night;
    case '11d':
    case '11n': return thunder;
    case '13d':
    case '13n': return snow;
    case '50d':
    case '50n': return mist;
    default: return clear_day;
  }
}

const localTimeZone = (UTC, timeOffSet) => {
  const localTime = new Date((UTC + timeOffSet) * 1000);
  const hours = localTime.getUTCHours().toString().padStart(2, '0');
  const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const Weather = () => {
  const APIKey = "51be0ed9490420b36f6c2a39f9fc7eb2";
  
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London')
  const [searchInput, setSearchInput] = useState('');

  const fetchWeather = (input) => {
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: input,
        appid: APIKey,
        units: 'metric'
      }
    })
    .then((response) => {
      console.log("Weather data:", response.data);
      setWeather(response.data);
      setCity(input)
    })
    .catch((error) => {
      console.error("Axios error:", error.response?.data || error.message);
  }); 
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchInput.trim() !== '') {
      fetchWeather(searchInput.trim());
      setSearchInput('');
    }
  }

  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div className='weather-app'>
      <div className='search-box'>
        <input
          type='text'
          placeholder='Search'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
        />
        <img src={search_icon} alt=''/>
      </div>
      <div className='weather-info-div-1'>
        <div className='weather-img-descr'>
          <img src={pickImageById(weather.weather[0].icon)} alt=''/>
          <p>{weather.weather[0].description}</p>
        </div>
        <div className='local-timezone'>
          <h2>Local Time</h2>
          <p>{localTimeZone(weather.dt, weather.timezone)}</p>
        </div>
      </div>
      <div className='weather-info-div-2'>
        <div className='temp-city'>
          <p className='temp'>{Math.round(weather.main.temp)}°C</p>
          <p className='city'>{weather.name}</p>
        </div>
        <div className='temp-min-max'>
          <h3>Today hi/Lo Temp</h3>
          <p>
            Hi: {Math.round(weather.main.temp_max)}°C
            <br/>
            Lo: {Math.round(weather.main.temp_min)}°C
          </p>
        </div>
      </div>  
      <div className='weather-info-div-3'>
        <div className='humidity'>
          <img src={humidity} alt=''/>
          <p>
            {weather.main.humidity} %
            <br/>
            Humidity
          </p>
        </div>
        <div className='wind'>
          <img src={wind} alt=''/>
          <p>
            {weather.wind.speed} km/h
            <br/>
            Wind Speed
            </p>
        </div>
        <div className='sunrise'>
          <div className='sunrise-img'>
              <img src={sunrise} alt=''/>
          </div>
          <div className='sunrise-text'>
            <p>
              Sunrise
            </p>
            <p> 
              {localTimeZone(weather.sys.sunrise, weather.timezone)}
            </p>
          </div>
        </div>
      </div>
      <div className='weather-info-div-4'>
        <div className='pressure'>
          <img src={pressure} alt=''/>
          <p>
            {weather.main.pressure} mb
            <br/>
            Pressure
          </p>
        </div>
        <div className='visibility'>
          <img src={visibility} alt=''/>
          <p>
            {weather.visibility} km
            <br/>
            Visibility
            </p>
        </div>
        <div className='sunset'>
          <div className='sunset-img'>
              <img src={sunset} alt=''/>
          </div>
          <div className='sunset-text'>
            <p>
              Sunset
            </p>
            <p> 
              {localTimeZone(weather.sys.sunset, weather.timezone)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather

//https://openweathermap.org/api