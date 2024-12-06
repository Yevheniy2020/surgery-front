import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button, { variants } from "../../button/Button";
import Table from "../../table/Table";
import MedicalCaseApi from "../../../api/MedicalCaseAPI";
import PatientsApi from "../../../api/PatientsAPI";
import InsuranceApi from "../../../api/InsuranceAPI";
import DiagnosesApi from "../../../api/DiagnosesAPI";

const ViewMedicalCase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc"); // State to manage sort order
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/medical-cases/${id.caseId}`);
  };

  useEffect(() => {
    fetchDiagnosesData();
  }, []);

  const handleRedirect = (path) => {
    navigate(`${path}`);
  };

  const handleDelete = async (id) => {
    try {
      await MedicalCaseApi.deleteMedicalCase(id.caseId);
      console.log(`Deleted medical case with id: ${id.caseId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting medical case:", error);
    }
  };

  const fetchDiagnosesData = async () => {
    setLoading(true);
    try {
      const fetchedData = await MedicalCaseApi.getAllMedicalCases();
      const transformedData = await Promise.all(
        fetchedData.map(async ({ caseStartDate, caseEndDate, ...rest }) => {
          const patientData = rest.patientId
            ? await fetchPatientById(rest.patientId)
            : null;
          const insuranceData = rest.insuranceId
            ? await fetchInsuranceById(rest.insuranceId)
            : null;
          const diagnoseData = rest.diagnoseId
            ? await fetchDiagnoseById(rest.diagnoseId)
            : null;
          return {
            ...rest,
            caseStartDate: new Date(caseStartDate).toLocaleString(),
            caseEndDate: caseEndDate
              ? new Date(caseEndDate).toLocaleString()
              : null,
            patientData,
            insuranceData,
            diagnoseData,
          };
        })
      );
      const filteredData = transformedData.map(
        ({ patientId, insuranceId, diagnoseId, ...rest }) => rest
      );

      setData(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Error fetching diagnosis data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDiagnoseById = async (id) => {
    try {
      const diagnoseData = await DiagnosesApi.getDiagnosisById(id);
      return diagnoseData.diagnoseDescription || "";
    } catch (error) {
      console.error("Error fetching diagnose data:", error);
    }
  };

  const fetchInsuranceById = async (id) => {
    try {
      const insuranceData = await InsuranceApi.getInsuranceById(id);
      return insuranceData.insuranceName || "";
    } catch (error) {
      console.error("Error fetching insurance data:", error);
    }
  };

  const fetchPatientById = async (id) => {
    try {
      const patientData = await PatientsApi.getPatientById(id);
      return (
        (patientData.patientName || "") +
        " " +
        (patientData.patientPatronymic || "") +
        " " +
        (patientData.patientSurname || "")
      ).trim();
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const handleSort = () => {
    console.log([...data]);
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(
        a.caseStartDate.split(", ")[0].split(".").reverse().join("-") +
          "T" +
          a.caseStartDate.split(", ")[1]
      );
      const dateB = new Date(
        b.caseStartDate.split(", ")[0].split(".").reverse().join("-") +
          "T" +
          b.caseStartDate.split(", ")[1]
      );
      const endDateA = new Date(
        a.caseEndDate
          ? a.caseEndDate.split(", ")[0].split(".").reverse().join("-") +
            "T" +
            a.caseEndDate.split(", ")[1]
          : null
      );
      const endDateB = new Date(
        b.caseEndDate
          ? b.caseEndDate.split(", ")[0].split(".").reverse().join("-") +
            "T" +
            b.caseEndDate.split(", ")[1]
          : null
      );

      if (sortOrder === "asc") {
        return dateA - dateB || endDateA - endDateB;
      } else {
        return dateB - dateA || endDateB - endDateA;
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };
  return (
    <div>
      {loading ? (
        <div className="infinite-spinner">
          <img src="/infinite-spinner.svg" alt="Loading..." />
        </div>
      ) : (
        <>
          <Table
            data={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <div className="buttons-bottom">
            <Button onClick={() => handleRedirect("/add/medical-cases")}>
              Add New
            </Button>
            <Button variant={variants.nav} onClick={() => handleRedirect("/")}>
              To Main
            </Button>
            <Button variant={variants.view} onClick={handleSort}>
              Sort by Date {sortOrder === "asc" ? "Descending" : "Ascending"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewMedicalCase;
