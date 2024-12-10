import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../button/Button";
import Input from "../../input/Input";
import DateTimePicker from "../../date-time-picker/DateTimePicker"; // Importing DateTimePicker component
import styles from "./EditStyles.module.css";
import { variants } from "../../button/Button";
import CaseOperationsApi from "../../../api/CaseOperationsAPI"; // Updated to use CaseOperationsAPI

const EditCaseOperations = () => {
  const { id } = useParams();
  const [caseId, setCaseId] = useState("");
  const [operationId, setOperationId] = useState("");
  const [startOfOperation, setStartOfOperation] = useState("");
  const [endOfOperation, setEndOfOperation] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCaseOperation = async () => {
      try {
        const fetchedData = await CaseOperationsApi.getCaseOperationById(id); // Updated to fetch case operation data
        setCaseId(fetchedData.caseId); // Updated to use caseId
        setOperationId(fetchedData.operationId); // Updated to use operationId
        setStartOfOperation(fetchedData.startOfOperation); // Updated to use startOfOperation
        setEndOfOperation(fetchedData.endOfOperation); // Updated to use endOfOperation
      } catch (error) {
        console.error("Error fetching case operation:", error);
      }
    };

    fetchCaseOperation();
  }, [id]);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!caseId) newErrors.caseId = "Case ID is required.";
    if (!operationId) newErrors.operationId = "Operation ID is required.";
    if (!startOfOperation)
      newErrors.startOfOperation = "Start of Operation is required.";
    if (!endOfOperation)
      newErrors.endOfOperation = "End of Operation is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const updatedData = {
        id,
        caseId, // Updated to use caseId
        operationId, // Updated to use operationId
        startOfOperation, // Updated to use startOfOperation
        endOfOperation, // Updated to use endOfOperation
      };
      try {
        const response = await CaseOperationsApi.updateCaseOperation(
          updatedData
        ); // Updated to use CaseOperationsAPI
        setSuccessMessage("Case Operation updated successfully!"); // Updated success message
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error updating case operation. Please try again."); // Updated error message
        setSuccessMessage("");
        console.error("Error updating case operation:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Case Operation</h1> {/* Updated heading */}
      <Input
        label="Case ID"
        value={caseId}
        onChange={handleInputChange(setCaseId)}
      />
      {errors.caseId && <p className={styles.error}>{errors.caseId}</p>}
      <Input
        label="Operation ID"
        value={operationId}
        onChange={handleInputChange(setOperationId)}
      />
      {errors.operationId && (
        <p className={styles.error}>{errors.operationId}</p>
      )}
      <DateTimePicker
        label="Start of Operation"
        value={startOfOperation}
        onChange={setStartOfOperation} // Using DateTimePicker's onChange
      />
      {errors.startOfOperation && (
        <p className={styles.error}>{errors.startOfOperation}</p>
      )}
      <DateTimePicker
        label="End of Operation"
        value={endOfOperation}
        onChange={setEndOfOperation} // Using DateTimePicker's onChange
      />
      {errors.endOfOperation && (
        <p className={styles.error}>{errors.endOfOperation}</p>
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

export default EditCaseOperations;
