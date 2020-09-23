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
    <div className="d-flex justify-content-center">
      <form onSubmit={onFormSubmit} className="form-inline">
        <label htmlFor="zipCodeInput" className="m-2">
          U.S. Zip Code:
        </label>
        <input
          type="text"
          className="form-control m-2 mw-25"
          id="zipCodeInput"
          placeholder="30305"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <input type="submit" className="btn btn-primary m-2" value="Submit" />
      </form>
    </div>
  );
};

export default Search;
