import React, { useState } from "react";
import PropTypes from "prop-types";
import "./DateTimePicker.css";

const DateTimePicker = ({ label, onChange }) => {
  const [dateTime, setDateTime] = useState("");

  const handleChange = (event) => {
    setDateTime(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="date-time-picker">
      <label>{label}</label>
      <input type="datetime-local" value={dateTime} onChange={handleChange} />
    </div>
  );
};

DateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
