import React from "react";
import moment from "moment";

const WeatherForecast = ({ weather, display }) => {
  return (
    <div className="card-body forecast" style={display}>
      {weather.forecast.map((day, idx) => {
        const imageSource = `http://openweathermap.org/img/wn/${day.icon}@2x.png`;
        return (
          <div className="row align-items-center mb-3" key={day.id}>
            <div className="col-sm-3 text-center">
              <h5>
                {moment()
                  .add(idx + 1, "day")
                  .format("dddd")}
              </h5>
            </div>
            <div className="col-sm-2 text-center bg-info">
              <img src={imageSource} alt={day.description} />
            </div>
            <div className="col-sm-7 text-center">
              {day.description} | high: {day.high}°F | low: {day.low}°F
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherForecast;
