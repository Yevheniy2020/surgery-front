import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button, { variants } from "../../button/Button";
import Table from "../../table/Table";
import MedicalCaseApi from "../../../api/MedicalCaseAPI";

const ViewMedicalCase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
      const transformedData = fetchedData.map(
        ({ caseStartDate, caseEndDate, ...rest }) => ({
          ...rest,
          caseStartDate: new Date(caseStartDate).toLocaleString(),
          caseEndDate: caseEndDate
            ? new Date(caseEndDate).toLocaleString()
            : null,
        })
      );
      setData(transformedData);
      console.log(fetchedData);
    } catch (error) {
      console.error("Error fetching diagnosis data:", error);
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
            <Button onClick={() => handleRedirect("/add/medical-cases")}>
              Add New
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

export default ViewMedicalCase;
