import React, { useState, useEffect } from 'react';
import './WeatherApp.css'; // 👈 custom CSS file

const Weather = () => {
  const [city, setCity] = useState('Karachi');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'ab0941c52583bef70bc65f5a98e4b786';

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="weather-app">
      <div className="card">
        <h2 className="title">🌤️ Weather Premium</h2>

        <div className="search">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button onClick={getWeather} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
            />
            <h3>{weather.name}</h3>
            <p className="temp">{weather.main.temp.toFixed(1)}°C</p>
            <p className="desc">{weather.weather[0].description}</p>
            <div className="details">
              <span>💧 Humidity: {weather.main.humidity}%</span>
              <span>🌬 Wind: {weather.wind.speed} m/s</span>
              <span>🌡️ Feels like: {weather.main.feels_like.toFixed(1)}°C</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
