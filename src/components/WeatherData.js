import React from "react";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";

const WeatherData = ({ weather, display, handleExpand, handleDelete }) => {
  return (
    <div className="card m-3">
      <CurrentWeather
        weather={weather}
        handleExpand={handleExpand}
        handleDelete={handleDelete}
      />
      <WeatherForecast weather={weather} display={display} />
    </div>
  );
};

export default WeatherData;
