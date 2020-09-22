import React, { useState, Fragment } from "react";
import axios from "axios";
import zipcodes from "zipcodes";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [zip, setZip] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { latitude, longitude } = zipcodes.lookup(zip);
      const currentData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
      );
      const { weather, name, main, sys } = currentData.data;
      const cityData = {
        description: weather[0].description,
        name: name,
        temperature: main.temp,
        id: sys.id,
      };

      const forecastData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${API_KEY}`
      );
      console.log(forecastData);
      const threeDayForecast = forecastData.data.daily
        .slice(1, 4)
        .map((day, idx) => {
          return {
            high: day.temp.max,
            low: day.temp.min,
            description: day.weather[0].description,
            id: idx,
          };
        });
      const weatherObject = {
        id: cityData.id,
        current: cityData,
        forecast: threeDayForecast,
      };
      setWeatherData(weatherData.concat(weatherObject));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = (id) => {
    setWeatherData(weatherData.filter((city) => city.id !== id));
  };

  const handleExpand = (idx) => {
    setActiveIndex(idx);
  };

  const renderedResults = weatherData.map((city, idx) => {
    const display = idx === activeIndex ? {} : { display: "none" };

    return (
      <div key={city.id} onClick={() => handleExpand(idx)}>
        <div>
          {city.current.name}: {city.current.description},{" "}
          {city.current.temperature} degrees Fahrenheit
        </div>
        <ul style={display}>
          {city.forecast.map((day) => {
            return (
              <li key={day.id}>
                {day.description} High: {day.high}, Low: {day.low}
              </li>
            );
          })}
        </ul>
        <button onClick={() => handleDelete(city.id)}>Delete</button>
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
