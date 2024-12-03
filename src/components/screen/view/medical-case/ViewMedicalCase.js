import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button, { variants } from "components/common/button/Button";
import Table from "components/common/tables/medical-case-table/Table";
import MedicalCaseApi from "api/medical-case/MedicalCaseAPI";
const ViewMedicalCase = () => {
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
          <Table data={data} />
          <div className="buttons-bottom">
            <Button onClick={() => handleRedirect("/add/diagnosis")}>
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
