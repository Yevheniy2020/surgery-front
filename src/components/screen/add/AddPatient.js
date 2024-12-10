import React, { useEffect, useState } from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./AddStyles.module.css";
import { variants } from "../../button/Button";
import PatientsApi from "../../../api/PatientsAPI"; // Updated to use PatientsAPI

const AddPatient = () => {
  const [patientName, setPatientName] = useState("");
  const [patientPatronymic, setPatientPatronymic] = useState("");
  const [patientSurname, setPatientSurname] = useState("");
  const [patientDateOfBirth, setPatientDateOfBirth] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!patientName) newErrors.patientName = "Patient Name is required.";
    if (!patientPatronymic)
      newErrors.patientPatronymic = "Patient Patronymic is required.";
    if (!patientSurname)
      newErrors.patientSurname = "Patient Surname is required.";
    if (!patientDateOfBirth)
      newErrors.patientDateOfBirth = "Patient Date of Birth is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const selectedData = {
        patientName,
        patientPatronymic,
        patientSurname,
        patientDateOfBirth,
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
        label="Patient Patronymic"
        value={patientPatronymic}
        onChange={handleInputChange(setPatientPatronymic)}
      />
      {errors.patientPatronymic && (
        <p className={styles.error}>{errors.patientPatronymic}</p>
      )}
      <Input
        label="Patient Surname"
        value={patientSurname}
        onChange={handleInputChange(setPatientSurname)}
      />
      {errors.patientSurname && (
        <p className={styles.error}>{errors.patientSurname}</p>
      )}
      <Input
        label="Date of Birth"
        value={patientDateOfBirth}
        type="date"
        onChange={handleInputChange(setPatientDateOfBirth)}
      />
      {errors.patientDateOfBirth && (
        <p className={styles.error}>{errors.patientDateOfBirth}</p>
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

export default AddPatient;
