import React from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./AddStyles.module.css";
import { variants } from "../../button/Button";
import { useState } from "react";
import PatientsApi from "../../../api/PatientsAPI"; // Updated to use PatientsAPI

const AddPatients = () => {
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!patientName) newErrors.patientName = "Patient Name is required.";
    if (!patientAge) newErrors.patientAge = "Patient Age is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const selectedData = {
        patientName,
        patientAge,
      };
      try {
        const response = await PatientsApi.addPatient(selectedData); // Updated to use addPatient
        setSuccessMessage("Patient added successfully!");
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error adding patient. Please try again.");
        setSuccessMessage("");
        console.error("Error adding patient:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add new Patient</h1>
      <Input
        label="Patient Name"
        value={patientName}
        onChange={handleInputChange(setPatientName)}
      />
      {errors.patientName && (
        <p className={styles.error}>{errors.patientName}</p>
      )}
      <Input
        label="Patient Age"
        value={patientAge}
        type="number"
        onChange={handleInputChange(setPatientAge)}
      />
      {errors.patientAge && <p className={styles.error}>{errors.patientAge}</p>}
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

export default AddPatients;
