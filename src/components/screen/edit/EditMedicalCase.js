import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./EditStyles.module.css";
import { variants } from "../../button/Button";
import DateTimePicker from "../../date-time-picker/DateTimePicker";
import MedicalCaseApi from "../../../api/MedicalCaseAPI";

const EditMedicalCase = () => {
  const { id } = useParams();
  const [caseStartDate, setCaseStartDate] = useState("");
  const [caseEndDate, setCaseEndDate] = useState("");
  const [patientId, setPatientId] = useState("");
  const [insuranceId, setInsuranceId] = useState("");
  const [diagnosisId, setDiagnosisId] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMedicalCase = async () => {
      try {
        const fetchedData = await MedicalCaseApi.getMedicalCaseById(id);
        setCaseStartDate(fetchedData.caseStartDate);
        setCaseEndDate(fetchedData.caseEndDate);
        setPatientId(fetchedData.patientId);
        setInsuranceId(fetchedData.insuranceId);
        setDiagnosisId(fetchedData.diagnosisId);
      } catch (error) {
        console.error("Error fetching medical case:", error);
      }
    };

    fetchMedicalCase();
  }, [id]);

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
    if (caseEndDate < caseStartDate)
      newErrors.dateRange = "End date must be after start date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (validateInputs()) {
      const updatedData = {
        id,
        caseStartDate,
        caseEndDate,
        patientId,
        insuranceId,
        diagnosisId,
      };
      try {
        const response = await MedicalCaseApi.updateMedicalCase(updatedData);
        setSuccessMessage("Medical case updated successfully!");
        setErrorMessage("");
        console.log(response);
      } catch (error) {
        setErrorMessage("Error updating medical case. Please try again.");
        setSuccessMessage("");
        console.error("Error updating medical case:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Medical Case</h1>
      <DateTimePicker
        label="Case Start Date"
        value={caseStartDate}
        onChange={(value) => handleChangeDateTimePicker(value, true)}
      />
      {errors.caseStartDate && (
        <p className={styles.error}>{errors.caseStartDate}</p>
      )}
      <DateTimePicker
        label="Case End Date"
        value={caseEndDate}
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

export default EditMedicalCase;
