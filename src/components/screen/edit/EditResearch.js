import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./EditStyles.module.css";
import { variants } from "../../button/Button";
import ResearchApi from "../../../api/ResearchAPI"; // Updated to use ResearchAPI

const EditResearch = () => {
  const { id } = useParams();
  const [researchName, setResearchName] = useState("");
  const [researchNormalValues, setResearchNormalValues] = useState(""); // Changed from researchDescription to researchNormalValues
  const [researchCost, setResearchCost] = useState(""); // Added researchCost
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const fetchedData = await ResearchApi.getResearchById(id); // Updated to fetch research data
        setResearchName(fetchedData.researchName); // Updated to use researchName
        setResearchNormalValues(fetchedData.researchNormalValues); // Updated to use researchNormalValues
        setResearchCost(fetchedData.researchCost); // Updated to use researchCost
      } catch (error) {
        console.error("Error fetching research:", error);
      }
    };

    fetchResearch();
  }, [id]);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!researchName) newErrors.researchName = "Research Name is required.";
    if (!researchNormalValues)
      newErrors.researchNormalValues = "Research Normal Values are required."; // Updated error message
    if (!researchCost) newErrors.researchCost = "Research Cost is required."; // Added validation for researchCost

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const updatedData = {
        id,
        researchName, // Updated to use researchName
        researchNormalValues, // Updated to use researchNormalValues
        researchCost, // Updated to use researchCost
      };
      try {
        const response = await ResearchApi.updateResearch(updatedData); // Updated to use ResearchAPI
        setSuccessMessage("Research updated successfully!"); // Updated success message
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error updating research. Please try again."); // Updated error message
        setSuccessMessage("");
        console.error("Error updating research:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Research</h1> {/* Updated heading */}
      <Input
        label="Name"
        value={researchName}
        onChange={handleInputChange(setResearchName)}
      />
      {errors.researchName && (
        <p className={styles.error}>{errors.researchName}</p>
      )}
      <Input
        label="Normal Values" // Changed label from Description to Normal Values
        value={researchNormalValues} // Updated to use researchNormalValues
        onChange={handleInputChange(setResearchNormalValues)} // Updated to use setResearchNormalValues
      />
      {errors.researchNormalValues && ( // Updated error message check
        <p className={styles.error}>{errors.researchNormalValues}</p>
      )}
      <Input
        label="Cost" // Added input for researchCost
        value={researchCost} // Updated to use researchCost
        type="number" // Changed type to number
        onChange={handleInputChange(setResearchCost)} // Updated to use setResearchCost
      />
      {errors.researchCost && ( // Updated error message check
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

export default EditResearch;
