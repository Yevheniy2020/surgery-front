import React, { useEffect, useState } from "react";
import CaseOperationsApi from "../../../api/CaseOperationsAPI"; // Updated to use OperationsAPI
import Table from "../../table/Table";
import Button, { variants } from "../../button/Button";
import { useNavigate } from "react-router-dom";

const ViewCaseOperations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCaseOperationsData();
  }, []);

  const handleRedirect = (path) => {
    navigate(`${path}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/case-operations/${id.caseOperationId}`);
  };

  const handleDelete = async (id) => {
    try {
      await CaseOperationsApi.deleteCaseOperation(id.caseOperationId);
      console.log(`Deleted case operation with id: ${id.caseOperationId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting case operation:", error);
    }
  };

  const fetchCaseOperationsData = async () => {
    setLoading(true);
    try {
      const fetchedData = await CaseOperationsApi.getAllCaseOperations();
      console.log(fetchedData);

      fetchedData.forEach((element) => {
        if (element.doctorsInCaseOperations.length !== 0) {
          element.doctorsInCaseOperationsId = element.doctorsInCaseOperations
            .map((item) => item.caseOperationId)
            .join(", ");
        } else {
          element.doctorsInCaseOperationsId = null;
        }
      });
      const filteredData = fetchedData.map(
        ({ doctorsInCaseOperations, ...rest }) => rest
      );
      setData(filteredData);
      console.log(fetchedData);
    } catch (error) {
      console.error("Error fetching case operations data:", error);
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
            <Button onClick={() => handleRedirect("/add/case-operations")}>
              Add New Case Operation
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

export default ViewCaseOperations;
