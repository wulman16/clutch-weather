import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import zipcodes from "zipcodes";
import Search from "./components/Search";
import Results from "./components/Results";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [cities, setCities] = useState(
    JSON.parse(localStorage.getItem("cities")) || []
  );
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
    async function getData() {
      const newWeatherData = [];
      for (const city of cities) {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=minutely,hourly,alerts&units=imperial&appid=${API_KEY}`
        );

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

  const handleSubmit = async (zip) => {
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
  };

  const handleDelete = (cityName) => {
    setCities(cities.filter((city) => city.name !== cityName));
    setWeatherData(weatherData.filter((weather) => weather.city !== cityName));
  };

  return (
    <div className="container">
      <h1 className="text-center m-3">
        <a className="text-decoration-none" href="/">
          Clutch Weather
        </a>
      </h1>
      <Search handleSubmit={handleSubmit} />
      <Results weatherData={weatherData} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
