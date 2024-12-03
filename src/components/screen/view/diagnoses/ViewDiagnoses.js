import React, { useEffect, useState } from "react";
import Table from "components/common/tables/medical-case-table/Table"; // Updated to use diagnoses-table
import Button, { variants } from "components/common/button/Button";
import { useNavigate } from "react-router-dom";
import DiagnosesApi from "api/diagnoses/DiagnosesAPI";
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
          <Table data={data} />
          <div className="buttons-bottom">
            <Button onClick={() => handleRedirect("/add/diagnosis")}>
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
