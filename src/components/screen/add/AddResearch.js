import React from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./AddStyles.module.css";
import { variants } from "../../button/Button";
import { useState } from "react";
import ResearchApi from "../../../api/ResearchAPI"; // Updated to use ResearchAPI

const AddResearch = () => {
  const [researchName, setResearchName] = useState("");
  const [researchNormalValues, setResearchNormalValues] = useState("");
  const [researchCost, setResearchCost] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!researchName) newErrors.researchName = "Research Name is required.";
    if (!researchNormalValues)
      newErrors.researchNormalValues = "Research Normal Values are required.";
    if (!researchCost) newErrors.researchCost = "Research Cost is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const selectedData = {
        researchName,
        researchNormalValues,
        researchCost,
      };
      try {
        const response = await ResearchApi.addResearch(selectedData); // Updated to use addResearch
        setSuccessMessage("Research added successfully!");
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error adding research. Please try again.");
        setSuccessMessage("");
        console.error("Error adding research:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add new Research</h1>
      <Input
        label="Name"
        value={researchName}
        onChange={handleInputChange(setResearchName)}
      />
      {errors.researchName && (
        <p className={styles.error}>{errors.researchName}</p>
      )}
      <Input
        label="Normal Values"
        value={researchNormalValues}
        onChange={handleInputChange(setResearchNormalValues)}
      />
      {errors.researchNormalValues && (
        <p className={styles.error}>{errors.researchNormalValues}</p>
      )}
      <Input
        label="Cost"
        value={researchCost}
        type="number"
        onChange={handleInputChange(setResearchCost)}
      />
      {errors.researchCost && (
        <p className={styles.error}>{errors.researchCost}</p>
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

export default AddResearch;
