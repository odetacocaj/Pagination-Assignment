import { useState } from "react";
import "./Filter.css";

function Filter({ data, onFilter, name }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const filteredData = data.filter((item) =>
      item[name].toLowerCase().includes(newValue.toLowerCase()),
    );

    onFilter(filteredData);
  };

  return (
    <input
      className="filter_input"
      name={name}
      placeholder={`Search for ${name}`}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}

export default Filter;
