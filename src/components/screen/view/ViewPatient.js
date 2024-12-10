import React, { useEffect, useState } from "react";
import PatientsApi from "../../../api/PatientsAPI"; // Updated to use ResearchAPI
import Table from "../../table/Table";
import Button, { variants } from "../../button/Button";
import { useNavigate } from "react-router-dom";

const ViewPatients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResearchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await PatientsApi.deletePatient(id.patientId);
      console.log(`Deleted medical case with id: ${id.patientId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting medical case:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/patient/${id.patientId}`);
  };

  const handleRedirect = (path) => {
    navigate(`${path}`);
  };

  const fetchResearchData = async () => {
    setLoading(true);
    try {
      const fetchedData = await PatientsApi.getAllPatients();
      console.log(fetchedData);

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
      console.error("Error fetching research data:", error);
    } finally {
      setLoading(false);
    }
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
            <Button onClick={() => handleRedirect("/add/patient")}>
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

export default ViewPatients;
