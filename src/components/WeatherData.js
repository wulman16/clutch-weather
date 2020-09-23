import React from "react";
import moment from "moment";

const WeatherData = ({ weather, display, handleExpand, handleDelete }) => {
  return (
    <div key={weather.city} onClick={() => handleExpand(weather.city)}>
      <div>
        {weather.city}:{" "}
        <img
          src={`http://openweathermap.org/img/wn/${weather.current.icon}@2x.png`}
          alt={weather.current.description}
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
                alt={day.description}
              />{" "}
              {day.description}, High: {day.high}, Low: {day.low}
            </li>
          );
        })}
      </ul>
      <button onClick={() => handleDelete(weather.city)}>Delete</button>
    </div>
  );
};

export default WeatherData;
