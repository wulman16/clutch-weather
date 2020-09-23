import React, { useState } from "react";
import WeatherData from "./WeatherData";

const Results = ({ weatherData, handleDelete }) => {
  const [activeCity, setActiveCity] = useState(null);

  const handleExpand = (city) => {
    setActiveCity(city === activeCity ? null : city);
  };

  const renderedResults = weatherData.map((weather, idx) => {
    const display = weather.city === activeCity ? {} : { display: "none" };

    return (
      <WeatherData
        key={idx}
        weather={weather}
        display={display}
        handleExpand={handleExpand}
        handleDelete={handleDelete}
      />
    );
  });

  return <div>{renderedResults}</div>;
};

export default Results;
