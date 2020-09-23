import React from "react";

const CurrentWeather = ({ weather, handleExpand, handleDelete }) => {
  const imageSource = `http://openweathermap.org/img/wn/${weather.current.icon}@2x.png`;
  return (
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
          <div className="row align-items-center m-2">
            <div className="col-sm-5 bg-info">
              <img src={imageSource} alt={weather.current.description} />
            </div>
            <div className="col-sm-7">
              {weather.current.description} | {weather.current.temperature}°F
            </div>
          </div>
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
  );
};

export default CurrentWeather;
