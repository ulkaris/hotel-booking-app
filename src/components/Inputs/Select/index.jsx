import React from "react";
import ReactSelect from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "6px",
    borderColor: state.isFocused ? "#3498db" : "#ccc",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(52, 152, 219, 0.2)" : "none",
    padding: "2px 6px",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    minHeight: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#3498db" : "#fff",
    color: state.isFocused ? "#fff" : "#333",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#999",
  }),
};

const Select = ({
  options,
  placeholder = "Select an option",
  onChange,
  className,
}) => {
  const handleChange = (selected) => {
    if (onChange) onChange(selected);
  };

  return (
    <ReactSelect
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      onChange={handleChange}
      isSearchable={false}
      className={className}
    />
  );
};

export default Select;
