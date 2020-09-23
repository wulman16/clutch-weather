import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import zipcodes from "zipcodes";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [zip, setZip] = useState("");
  const [cities, setCities] = useState(
    JSON.parse(localStorage.getItem("cities")) || []
  );
  const [weatherData, setWeatherData] = useState([]);
  const [activeCity, setActiveCity] = useState(null);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    async function getData() {
      const newWeatherData = [];
      for (const city of cities) {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=minutely,hourly,alerts&units=imperial&appid=${API_KEY}`
        );

        const currentWeather = {
          description: data.current.weather[0].description,
          temperature: data.current.temp,
        };

        const threeDayForecast = data.daily.slice(1, 4).map((day, idx) => {
          return {
            high: day.temp.max,
            low: day.temp.min,
            description: day.weather[0].description,
            id: idx,
          };
        });

        const weatherObject = {
          city: city.name,
          current: currentWeather,
          forecast: threeDayForecast,
        };
        newWeatherData.push(weatherObject);
      }
      setWeatherData(newWeatherData);
    }
    getData();
  }, [cities]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { latitude, longitude, city } = zipcodes.lookup(zip);
      setCities(cities.concat({ latitude, longitude, name: city }));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = (cityName) => {
    setCities(cities.filter((city) => city.name !== cityName));
    setWeatherData(weatherData.filter((weather) => weather.city !== cityName));
  };

  const handleExpand = (city) => {
    setActiveCity(city);
  };

  const renderedResults = weatherData.map((weather) => {
    const display = weather.city === activeCity ? {} : { display: "none" };

    return (
      <div key={weather.city} onClick={() => handleExpand(weather.city)}>
        <div>
          {weather.city}: {weather.current.description},{" "}
          {weather.current.temperature} degrees Fahrenheit
        </div>
        <ul style={display}>
          {weather.forecast.map((day) => {
            return (
              <li key={day.id}>
                {day.description}, High: {day.high}, Low: {day.low}
              </li>
            );
          })}
        </ul>
        <button onClick={() => handleDelete(weather.city)}>Delete</button>
      </div>
    );
  });

  return (
    <Fragment>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter Zip Code</label>
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      <div>{renderedResults}</div>
    </Fragment>
  );
};

export default App;
