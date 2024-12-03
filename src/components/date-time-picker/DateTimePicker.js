import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./DateTimePicker.css";

const DateTimePicker = ({ label, value, onChange }) => {
  const [dateTime, setDateTime] = useState(value);

  useEffect(() => {
    setDateTime(value);
  }, [value]);

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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
