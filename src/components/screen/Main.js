import { useNavigate } from "react-router-dom";
import React from "react";
import Button from "../common/Button/Button";
import Table from "../common/Table/Table";
import MedicalCaseApi from "../../api/medical-case/MedicalCaseAPI";
import { useEffect, useState } from "react";

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiagnosesData();
  }, []);

  const handleRedirect = (path) => {
    navigate(`${path}`);
  };

  const fetchDiagnosesData = async () => {
    setLoading(true); // Set loading to true before fetching data
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
      setLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table data={data} />
          <div className="add-new">
            <Button onClick={() => handleRedirect("/add/diagnosis")}>
              Add New
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
