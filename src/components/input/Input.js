import React from "react";
import styles from "./Input.module.css";

const Input = ({ label, value, onChange, type = "text" }) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
