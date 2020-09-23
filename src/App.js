import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import zipcodes from "zipcodes";
import moment from "moment";

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
    async function getData() {
      const newWeatherData = [];
      for (const city of cities) {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=minutely,hourly,alerts&units=imperial&appid=${API_KEY}`
        );

        console.log(data);

        const currentWeather = {
          description: data.current.weather[0].description,
          temperature: data.current.temp,
          icon: data.current.weather[0].icon,
        };

        const threeDayForecast = data.daily.slice(1, 4).map((day, idx) => {
          return {
            high: day.temp.max,
            low: day.temp.min,
            description: day.weather[0].description,
            icon: day.weather[0].icon,
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
      const cityData = zipcodes.lookup(zip);
      if (!cityData) throw new Error("Invalid ZIP code!");
      const { latitude, longitude, city } = cityData;
      if (cities.some((cityObject) => cityObject.name === city))
        throw new Error("City already added!");
      setCities(cities.concat({ latitude, longitude, name: city }));
    } catch (error) {
      console.log(error);
    }
    setZip("");
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
          {weather.city}:{" "}
          <img
            src={`http://openweathermap.org/img/wn/${weather.current.icon}@2x.png`}
          />{" "}
          {weather.current.description}, {weather.current.temperature} degrees
          Fahrenheit
        </div>
        <ul style={display}>
          {weather.forecast.map((day, idx) => {
            return (
              <li key={day.id}>
                {moment()
                  .add(idx + 1, "day")
                  .format("dddd")}
                :{" "}
                <img
                  src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                />{" "}
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
        <label>Enter U.S. Zip Code</label>
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
