import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./EditStyles.module.css";
import { variants } from "../../button/Button";
import OperationsApi from "../../../api/OperationsAPI"; // Updated to use OperationsAPI

const EditOperations = () => {
  const { id } = useParams();
  const [operationName, setOperationName] = useState("");
  const [operationCost, setOperationCost] = useState(""); // Changed from operationDate to operationCost
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOperation = async () => {
      try {
        const fetchedData = await OperationsApi.getOperationById(id); // Updated to fetch operation data
        setOperationName(fetchedData.operationName); // Updated to use operationName
        setOperationCost(fetchedData.operationCost); // Updated to use operationCost
      } catch (error) {
        console.error("Error fetching operation:", error);
      }
    };

    fetchOperation();
  }, [id]);

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
      const updatedData = {
        id,
        operationName, // Updated to use operationName
        operationCost, // Updated to use operationCost
      };
      try {
        const response = await OperationsApi.updateOperation(updatedData); // Updated to use OperationsAPI
        setSuccessMessage("Operation updated successfully!"); // Updated success message
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error updating operation. Please try again."); // Updated error message
        setSuccessMessage("");
        console.error("Error updating operation:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Operation</h1> {/* Updated heading */}
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

export default EditOperations;
