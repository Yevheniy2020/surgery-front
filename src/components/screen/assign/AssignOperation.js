import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/DoctorAPI";
import Button from "../../button/Button";
import DateTimePicker from "../../date-time-picker/DateTimePicker";
import Input from "../../input/Input";
import styles from "./AssignStyles.module.css"; // Importing the assign styles

const AssignOperation = () => {
  const { id } = useParams();
  const [caseOperationId, setCaseOperationId] = useState("");
  const [startOfOperating, setStartOfOperating] = useState("");
  const [endOfOperating, setEndOfOperating] = useState("");
  const [message, setMessage] = useState({});
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (!caseOperationId)
      newErrors.caseOperationId = "Case Operation ID is required.";
    if (!startOfOperating)
      newErrors.startOfOperating = "Start of Operating is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAssignOperation = async () => {
    if (validateInputs()) {
      const operationDetails = {
        caseOperationId: parseInt(caseOperationId),
        doctorId: parseInt(id),
        startOfOperating,
        endOfOperating: endOfOperating || null,
      };

      try {
        await DoctorApi.assignOperation(
          operationDetails.doctorId,
          operationDetails
        );
        setMessage({ success: "Operation assigned successfully!" });
      } catch (error) {
        console.error("Error assigning operation:", error);
        setMessage({ error: "Failed to assign operation. Please try again." });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Assign Operation</h1>
      <Input
        label="Case Operation ID"
        type="number"
        value={caseOperationId}
        onChange={(e) => setCaseOperationId(e.target.value)}
      />
      {errors.caseOperationId && (
        <p className={styles.error}>{errors.caseOperationId}</p>
      )}
      <DateTimePicker
        label="Start of Operating"
        value={startOfOperating}
        onChange={(value) => setStartOfOperating(value)}
      />
      {errors.startOfOperating && (
        <p className={styles.error}>{errors.startOfOperating}</p>
      )}
      <DateTimePicker
        label="End of Operating (optional)"
        value={endOfOperating}
        onChange={(value) => setEndOfOperating(value)}
      />
      <Button onClick={handleAssignOperation}>Assign Operation</Button>
      {message.success && (
        <p className={styles.successNotification}>{message.success}</p>
      )}
      {message.error && (
        <p className={styles.errorNotification}>{message.error}</p>
      )}
    </div>
  );
};

export default AssignOperation;
