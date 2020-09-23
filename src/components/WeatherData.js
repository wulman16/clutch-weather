import React from "react";
import moment from "moment";

const WeatherData = ({ weather, display, handleExpand, handleDelete }) => {
  return (
    <div className="card m-2">
      <div
        className="btn card-header"
        type="button"
        key={weather.city}
        onClick={() => handleExpand(weather.city)}
      >
        <div className="row align-items-center">
          <div className="col-md-4">
            <h3>{weather.city}</h3>
          </div>
          <div className="col-md-6">
            <img
              src={`http://openweathermap.org/img/wn/${weather.current.icon}@2x.png`}
              alt={weather.current.description}
            />
            {weather.current.description} | {weather.current.temperature}°F
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(weather.city)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="card-body forecast" style={display}>
        {weather.forecast.map((day, idx) => {
          return (
            <div className="row align-items-center mb-2" key={day.id}>
              <div className="col-sm-3 text-center">
                <h5>
                  {moment()
                    .add(idx + 1, "day")
                    .format("dddd")}
                </h5>
              </div>
              <div className="col-sm-2 text-center">
                <img
                  src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                />
              </div>
              <div className="col-sm-7 text-center">
                {day.description} | High: {day.high}°F | Low: {day.low}°F
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherData;
