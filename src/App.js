import React from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default () => {
  (async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?zip=30308&appid=${API_KEY}`
    );
    console.log(data);
  })();
  return <h1>Weather App</h1>;
};
