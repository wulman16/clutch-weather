import React, { useState } from "react";

const Search = ({ handleSubmit }) => {
  const [zip, setZip] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(zip);
    setZip("");
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>Enter U.S. Zip Code</label>
      <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Search;
