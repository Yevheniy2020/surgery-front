import React, { useState } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownToggle}>
        {selectedOption ? selectedOption.label : "Select an option"}
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={styles.dropdownItem}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
