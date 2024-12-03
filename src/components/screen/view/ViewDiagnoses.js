import React, { useEffect, useState } from "react";
import Table from "../../table/Table"; // Updated to use diagnoses-table
import Button, { variants } from "../../button/Button";
import { useNavigate } from "react-router-dom";
import DiagnosesApi from "../../../api/DiagnosesAPI";

const ViewDiagnoses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiagnosesData();
  }, []);

  const handleRedirect = (path) => {
    navigate(`${path}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/diagnoses/${id.diagnoseId}`);
  };

  const handleDelete = async (id) => {
    try {
      await DiagnosesApi.deleteDiagnosis(id.diagnoseId);
      console.log(`Deleted medical case with id: ${id.diagnoseId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting medical case:", error);
    }
  };

  const fetchDiagnosesData = async () => {
    setLoading(true);
    try {
      const fetchedData = await DiagnosesApi.getAllDiagnoses();
      fetchedData.forEach((element) => {
        if (element.medicalCases.length !== 0) {
          element.medicalCasesId = element.medicalCases
            .map((item) => item.caseId)
            .join(", ");
        } else {
          element.medicalCasesId = null;
        }
      });
      const filteredData = fetchedData.map(({ medicalCases, ...rest }) => rest);
      setData(filteredData);
      console.log(fetchedData);
    } catch (error) {
      console.error("Error fetching diagnoses data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table
            data={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <div className="buttons-bottom">
            <Button onClick={() => handleRedirect("/add/diagnoses")}>
              Add New Diagnosis
            </Button>
            <Button variant={variants.nav} onClick={() => handleRedirect("/")}>
              To Main
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewDiagnoses;
