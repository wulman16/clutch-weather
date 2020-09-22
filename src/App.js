import React, { useState, Fragment } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [zip, setZip] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${API_KEY}`
      );
      const { weather, name, main, sys } = data;
      const cityData = {
        description: weather[0].description,
        name: name,
        temperature: main.temp,
        id: sys.id,
      };
      setWeatherData(weatherData.concat(cityData));
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderedResults = weatherData.map((city) => {
    return (
      <li key={city.id}>
        {city.name}: {city.description}, {city.temperature} degrees Fahrenheit
      </li>
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
