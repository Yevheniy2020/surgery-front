import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./EditStyles.module.css";
import { variants } from "../../button/Button";
import DoctorApi from "../../../api/DoctorAPI"; // Updated to use DoctorAPI

const EditDoctor = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const fetchedData = await DoctorApi.getDoctorById(id); // Updated to fetch doctor data
        setName(fetchedData.doctorName); // Updated to use doctorName
        setSurname(fetchedData.doctorSurname); // Updated to use doctorSurname
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, [id]);

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
      const updatedData = {
        id,
        doctorName: name, // Updated to use doctorName
        doctorSurname: surname, // Updated to use doctorSurname
      };
      try {
        const response = await DoctorApi.updateDoctor(updatedData); // Updated to use DoctorAPI
        setSuccessMessage("Doctor updated successfully!"); // Updated success message
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error updating doctor. Please try again."); // Updated error message
        setSuccessMessage("");
        console.error("Error updating doctor:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Doctor</h1> {/* Updated heading */}
      <Input label="Name" value={name} onChange={handleInputChange(setName)} />
      {errors.name && <p className={styles.error}>{errors.name}</p>}
      <Input
        label="Surname"
        value={surname}
        onChange={handleInputChange(setSurname)}
      />
      {errors.surname && <p className={styles.error}>{errors.surname}</p>}
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

export default EditDoctor; // Updated export
