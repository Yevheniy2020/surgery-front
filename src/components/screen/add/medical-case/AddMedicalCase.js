import React from "react";
import Button from "components/common/button/Button";
import Input from "components/common/input/Input";
import styles from "./AddMedicalCase.module.css";
import { variants } from "components/common/button/Button";
import DateTimePicker from "components/common/date-time-picker/DateTimePicker";
import { useState } from "react";
import MedicalCaseApi from "api/medical-case/MedicalCaseAPI";

const AddMedicalCase = () => {
  const [caseStartDate, setCaseStartDate] = useState("");
  const [caseEndDate, setCaseEndDate] = useState("");
  const [patientId, setPatientId] = useState("");
  const [insuranceId, setInsuranceId] = useState("");
  const [diagnosisId, setDiagnosisId] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeDateTimePicker = (value, isStartDate) => {
    if (isStartDate) {
      setCaseStartDate(value);
    } else {
      setCaseEndDate(value);
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!caseStartDate)
      newErrors.caseStartDate = "Case Start Date is required.";
    if (!caseEndDate) newErrors.caseEndDate = "Case End Date is required.";
    if (!patientId) newErrors.patientId = "Patient ID is required.";
    if (!insuranceId) newErrors.insuranceId = "Insurance ID is required.";
    if (!diagnosisId) newErrors.diagnosisId = "Diagnosis ID is required.";
    if (!details) newErrors.details = "Details are required.";
    if (caseEndDate < caseStartDate)
      newErrors.dateRange = "End date must be after start date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const selectedData = {
        caseStartDate,
        caseEndDate,
        patientId,
        insuranceId,
        diagnosisId,
        details,
      };
      try {
        const response = await MedicalCaseApi.addMedicalCase(selectedData);
        setSuccessMessage("Medical case added successfully!");
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error adding medical case. Please try again.");
        setSuccessMessage("");
        console.error("Error adding medical case:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add new Medical Case</h1>
      <DateTimePicker
        label="Case Start Date"
        onChange={(value) => handleChangeDateTimePicker(value, true)}
      />
      {errors.caseStartDate && (
        <p className={styles.error}>{errors.caseStartDate}</p>
      )}
      <DateTimePicker
        label="Case End Date"
        onChange={(value) => handleChangeDateTimePicker(value, false)}
      />
      {errors.caseEndDate && (
        <p className={styles.error}>{errors.caseEndDate}</p>
      )}
      <Input
        label="Patient ID"
        value={patientId}
        onChange={handleInputChange(setPatientId)}
        type="number"
      />
      {errors.patientId && <p className={styles.error}>{errors.patientId}</p>}
      <Input
        label="Insurance ID"
        value={insuranceId}
        onChange={handleInputChange(setInsuranceId)}
        type="number"
      />
      {errors.insuranceId && (
        <p className={styles.error}>{errors.insuranceId}</p>
      )}
      <Input
        label="Diagnosis ID"
        value={diagnosisId}
        onChange={handleInputChange(setDiagnosisId)}
        type="number"
      />
      {errors.diagnosisId && (
        <p className={styles.error}>{errors.diagnosisId}</p>
      )}
      <Input
        label="Details"
        value={details}
        onChange={handleInputChange(setDetails)}
      />
      {errors.details && <p className={styles.error}>{errors.details}</p>}
      {errors.dateRange && <p className={styles.error}>{errors.dateRange}</p>}
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

export default AddMedicalCase;
