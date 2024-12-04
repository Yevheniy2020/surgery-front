import React, { useEffect, useState } from "react";
import Table from "../../table/Table"; // Updated to use insurance-table
import Button, { variants } from "../../button/Button";
import { useNavigate } from "react-router-dom";
import InsuranceApi from "../../../api/InsuranceAPI"; // Updated to use InsuranceAPI

const ViewInsurance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInsuranceData();
  }, []);

  const handleRedirect = (path) => {
    navigate(`${path}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/insurance/${id.insuranceId}`);
  };

  const handleDelete = async (id) => {
    try {
      await InsuranceApi.deleteInsurance(id.insuranceId);
      console.log(`Deleted medical case with id: ${id.insuranceId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting medical case:", error);
    }
  };

  const fetchInsuranceData = async () => {
    setLoading(true);
    try {
      const fetchedData = await InsuranceApi.getAllInsurancePlans();

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
    } catch (error) {
      console.error("Error fetching insurance data:", error);
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
            <Button onClick={() => handleRedirect("/add/insurance")}>
              Add New Insurance
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

export default ViewInsurance;
