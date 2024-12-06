import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/DoctorAPI";
import Button from "../../button/Button";
import styles from "./AssignStyles.module.css";
import Input from "../../input/Input";

const AssignMedicalCase = () => {
  const { id } = useParams();
  const [caseId, setCaseId] = useState("");
  const [message, setMessage] = useState({});
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (!caseId) newErrors.caseId = "Medical Case ID is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAssignMedicalCase = async () => {
    if (validateInputs()) {
      const caseDetails = {
        caseId: parseInt(caseId),
        doctorId: parseInt(id),
      };

      try {
        await DoctorApi.assignMedicalCase(caseDetails.doctorId, caseDetails);
        setMessage({ success: "Medical case assigned successfully!" });
      } catch (error) {
        console.error("Error assigning medical case:", error);
        setMessage({
          error: "Failed to assign medical case. Please try again.",
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Assign Medical Case</h1>
      <Input
        label="Medical Case ID"
        type="number"
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
      />
      {errors.caseId && <p className={styles.error}>{errors.caseId}</p>}
      <Button onClick={handleAssignMedicalCase}>Assign Medical Case</Button>
      {message.success && (
        <p className={styles.successNotification}>{message.success}</p>
      )}
      {message.error && (
        <p className={styles.errorNotification}>{message.error}</p>
      )}
    </div>
  );
};

export default AssignMedicalCase;
