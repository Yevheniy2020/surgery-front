import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./EditStyles.module.css";
import { variants } from "../../button/Button";
import DiagnosesApi from "../../../api/DiagnosesAPI";

const EditDiagnosis = () => {
  const { id } = useParams();
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const fetchedData = await DiagnosesApi.getDiagnosisById(id);
        setDetails(fetchedData.diagnoseDescription);
      } catch (error) {
        console.error("Error fetching diagnosis:", error);
      }
    };

    fetchDiagnosis();
  }, [id]);

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
      const updatedData = {
        id,
        diagnoseDescription: details,
      };
      try {
        const response = await DiagnosesApi.updateDiagnosis(updatedData);
        setSuccessMessage("Diagnosis updated successfully!");
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error updating diagnosis. Please try again.");
        setSuccessMessage("");
        console.error("Error updating diagnosis:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Diagnosis</h1>
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

export default EditDiagnosis;
