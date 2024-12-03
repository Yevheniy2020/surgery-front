import React from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./AddStyles.module.css";
import { variants } from "../../button/Button";
import { useState } from "react";
import DoctorApi from "../../../api/DoctorAPI";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required.";
    if (!surname) newErrors.surname = "Surname is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const selectedData = {
        doctorName: name,
        doctorSurname: surname,
      };
      try {
        const response = await DoctorApi.addDoctor(selectedData);
        setSuccessMessage("Doctor added successfully!");
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error adding doctor. Please try again.");
        setSuccessMessage("");
        console.error("Error adding doctor:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add new Doctor</h1>
      <Input label="Name" value={name} onChange={handleInputChange(setName)} />
      {errors.name && <p className={styles.error}>{errors.name}</p>}
      <Input
        label="Surname"
        value={surname}
        onChange={handleInputChange(setSurname)}
      />{" "}
      {errors.surname && <p className={styles.error}>{errors.surname}</p>}{" "}
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

export default AddDoctor;
