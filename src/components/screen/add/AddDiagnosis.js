import React from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./AddStyles.module.css";
import { variants } from "../../button/Button";
import { useState } from "react";
import DiagnosesApi from "../../../api/DiagnosesAPI";

const AddDiagnosis = () => {
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!details) newErrors.details = "Details are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const selectedData = {
        diagnoseDescription: details,
      };
      try {
        const response = await DiagnosesApi.addDiagnosis(selectedData);
        setSuccessMessage("Diagnosis added successfully!");
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error adding diagnosis. Please try again.");
        setSuccessMessage("");
        console.error("Error adding diagnosis:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add new Diagnosis</h1>
      <Input
        label="Description"
        value={details}
        onChange={handleInputChange(setDetails)}
      />
      {errors.details && <p className={styles.error}>{errors.details}</p>}
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

export default AddDiagnosis;
