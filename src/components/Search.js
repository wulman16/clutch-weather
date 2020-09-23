import "./Search.css";
import React, { useState } from "react";

const Search = ({ handleSubmit }) => {
  const [zip, setZip] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(zip);
    setZip("");
  };

  return (
    <div className="d-flex justify-content-center m-2">
      <form onSubmit={onFormSubmit} className="form-inline">
        <label htmlFor="zipCodeInput" className="m-1">
          U.S. Zip Code:
        </label>
        <input
          type="text"
          className="form-control m-1 mw-25"
          id="zipCodeInput"
          placeholder="30305"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <input type="submit" className="btn btn-primary m-1" value="Add City" />
      </form>
    </div>
  );
};

export default Search;
