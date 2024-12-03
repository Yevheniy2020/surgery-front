import React from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./AddStyles.module.css";
import { variants } from "../../button/Button";
import { useState } from "react";
import OperationsApi from "../../../api/OperationsAPI"; // Updated to use OperationsAPI

const AddOperations = () => {
  const [operationName, setOperationName] = useState("");
  const [operationCost, setOperationCost] = useState(""); // Changed from operationDate to operationCost
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!operationName) newErrors.operationName = "Operation Name is required.";
    if (!operationCost) newErrors.operationCost = "Operation Cost is required."; // Updated error message

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const selectedData = {
        operationName,
        operationCost, // Updated to use operationCost
      };
      try {
        const response = await OperationsApi.addOperation(selectedData); // Updated to use addOperation
        setSuccessMessage("Operation added successfully!");
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error adding operation. Please try again.");
        setSuccessMessage("");
        console.error("Error adding operation:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add new Operation</h1>
      <Input
        label="Name"
        value={operationName}
        onChange={handleInputChange(setOperationName)}
      />
      {errors.operationName && (
        <p className={styles.error}>{errors.operationName}</p>
      )}
      <Input
        label="Cost" // Changed label from Operation Date to Operation Cost
        value={operationCost} // Updated to use operationCost
        type="number" // Changed type to number
        onChange={handleInputChange(setOperationCost)} // Updated to use setOperationCost
      />
      {errors.operationCost && ( // Updated error message check
        <p className={styles.error}>{errors.operationCost}</p>
      )}
      <Button variant={variants.add} onClick={handleSaveChanges}>
        Save Changes
      </Button>
      {successMessage && (
        <p className={styles.successNotification}>{successMessage}</p>
      )}
      {errorMessage && (
        <p className={styles.errorNotification}>{errorMessage}</p>
      )}
    </div>
  );
};

export default AddOperations;
