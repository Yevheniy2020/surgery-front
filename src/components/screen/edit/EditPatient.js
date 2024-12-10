import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./EditStyles.module.css";
import { variants } from "../../button/Button";
import PatientsApi from "../../../api/PatientsAPI"; // Updated to use PatientsAPI

const EditPatient = () => {
  const { id } = useParams();
  const [patientName, setPatientName] = useState("");
  const [patientPatronymic, setPatientPatronymic] = useState("");
  const [patientSurname, setPatientSurname] = useState("");
  const [patientDateOfBirth, setPatientDateOfBirth] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const fetchedData = await PatientsApi.getPatientById(id); // Updated to fetch patient data
        setPatientName(fetchedData.patientName.trim()); // Updated to use patientName
        setPatientPatronymic(fetchedData.patientPatronymic.trim()); // Updated to use patientPatronymic
        setPatientSurname(fetchedData.patientSurname.trim()); // Updated to use patientSurname
        setPatientDateOfBirth(fetchedData.patientDateOfBirth); // Updated to use patientDateOfBirth
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!patientName) newErrors.patientName = "Patient Name is required.";
    if (!patientPatronymic)
      newErrors.patientPatronymic = "Patient Patronymic is required."; // Updated error message
    if (!patientSurname)
      newErrors.patientSurname = "Patient Surname is required."; // Added validation for patientSurname
    if (!patientDateOfBirth)
      newErrors.patientDateOfBirth = "Patient Date of Birth is required."; // Added validation for patientDateOfBirth

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const updatedData = {
        id,
        patientName, // Updated to use patientName
        patientPatronymic, // Updated to use patientPatronymic
        patientSurname, // Updated to use patientSurname
        patientDateOfBirth, // Updated to use patientDateOfBirth
      };
      try {
        const response = await PatientsApi.updatePatient(updatedData); // Updated to use PatientsAPI
        setSuccessMessage("Patient updated successfully!"); // Updated success message
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error updating patient. Please try again."); // Updated error message
        setSuccessMessage("");
        console.error("Error updating patient:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Patient</h1> {/* Updated heading */}
      <Input
        label="Name"
        value={patientName}
        onChange={handleInputChange(setPatientName)}
      />
      {errors.patientName && (
        <p className={styles.error}>{errors.patientName}</p>
      )}
      <Input
        label="Patronymic" // Added input for patientPatronymic
        value={patientPatronymic} // Updated to use patientPatronymic
        onChange={handleInputChange(setPatientPatronymic)} // Updated to use setPatientPatronymic
      />
      {errors.patientPatronymic && ( // Updated error message check
        <p className={styles.error}>{errors.patientPatronymic}</p>
      )}
      <Input
        label="Surname" // Added input for patientSurname
        value={patientSurname} // Updated to use patientSurname
        onChange={handleInputChange(setPatientSurname)} // Updated to use setPatientSurname
      />
      {errors.patientSurname && ( // Updated error message check
        <p className={styles.error}>{errors.patientSurname}</p>
      )}
      <Input
        label="Date of Birth" // Added input for patientDateOfBirth
        value={patientDateOfBirth} // Updated to use patientDateOfBirth
        type="date" // Changed type to date
        onChange={handleInputChange(setPatientDateOfBirth)} // Updated to use setPatientDateOfBirth
      />
      {errors.patientDateOfBirth && ( // Updated error message check
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

export default EditPatient;
