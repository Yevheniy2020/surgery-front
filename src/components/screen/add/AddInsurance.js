import React from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./AddStyles.module.css";
import { variants } from "../../button/Button";
import { useState } from "react";
import InsuranceApi from "../../../api/InsuranceAPI";

const AddInsurance = () => {
  const [insuranceName, setInsuranceName] = useState("");
  const [insuranceCoverageAmount, setInsuranceCoverageAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!insuranceName) newErrors.insuranceName = "Insurance Name is required.";
    if (!insuranceCoverageAmount)
      newErrors.insuranceCoverageAmount =
        "Insurance Coverage Amount is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const selectedData = {
        insuranceName,
        insuranceCoverageAmount,
      };
      try {
        const response = await InsuranceApi.addInsurance(selectedData);
        setSuccessMessage("Insurance added successfully!");
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error adding insurance. Please try again.");
        setSuccessMessage("");
        console.error("Error adding insurance:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add new Insurance</h1>
      <Input
        label="Name"
        value={insuranceName}
        onChange={handleInputChange(setInsuranceName)}
      />
      {errors.insuranceName && (
        <p className={styles.error}>{errors.insuranceName}</p>
      )}
      <Input
        label="Coverage Amount"
        value={insuranceCoverageAmount}
        type="number"
        onChange={handleInputChange(setInsuranceCoverageAmount)}
      />
      {errors.insuranceCoverageAmount && (
        <p className={styles.error}>{errors.insuranceCoverageAmount}</p>
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

export default AddInsurance;
