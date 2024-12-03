import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./EditStyles.module.css";
import { variants } from "../../button/Button";
import InsuranceApi from "../../../api/InsuranceAPI"; // Updated to use InsuranceAPI

const EditInsurance = () => {
  const { id } = useParams();
  const [insuranceName, setInsuranceName] = useState("");
  const [insuranceCoverageAmount, setInsuranceCoverageAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const fetchedData = await InsuranceApi.getInsuranceById(id); // Updated to fetch insurance data
        setInsuranceName(fetchedData.insuranceName); // Updated to use insuranceName
        setInsuranceCoverageAmount(fetchedData.insuranceCoverageAmount); // Updated to use insuranceCoverageAmount
      } catch (error) {
        console.error("Error fetching insurance:", error);
      }
    };

    fetchInsurance();
  }, [id]);

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
      const updatedData = {
        id,
        insuranceName, // Updated to use insuranceName
        insuranceCoverageAmount, // Updated to use insuranceCoverageAmount
      };
      try {
        const response = await InsuranceApi.updateInsurance(updatedData); // Updated to use InsuranceAPI
        setSuccessMessage("Insurance updated successfully!"); // Updated success message
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error updating insurance. Please try again."); // Updated error message
        setSuccessMessage("");
        console.error("Error updating insurance:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Insurance</h1> {/* Updated heading */}
      <Input
        label="Insurance Name"
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

export default EditInsurance; // Updated export
