import React, { useEffect, useState } from "react";
import OperationsApi from "../../../api/OperationsAPI"; // Updated to use OperationsAPI
import Table from "../../table/Table";
import Button, { variants } from "../../button/Button";
import { useNavigate } from "react-router-dom";

const ViewOperations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOperationsData();
  }, []);

  const handleRedirect = (path) => {
    navigate(`${path}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/operations/${id.operationId}`);
  };

  const handleDelete = async (id) => {
    try {
      await OperationsApi.deleteOperation(id.operationId);
      console.log(`Deleted medical case with id: ${id.operationId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting medical case:", error);
    }
  };

  const fetchOperationsData = async () => {
    setLoading(true);
    try {
      const fetchedData = await OperationsApi.getAllOperations();
      fetchedData.forEach((element) => {
        if (element.caseOperations.length !== 0) {
          element.caseOperationsdId = element.caseOperations
            .map((item) => item.caseId)
            .join(", ");
        } else {
          element.caseOperationsId = null;
        }
      });
      const filteredData = fetchedData.map(
        ({ caseOperations, ...rest }) => rest
      );
      setData(filteredData);
      console.log(fetchedData);
    } catch (error) {
      console.error("Error fetching operations data:", error);
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
            <Button onClick={() => handleRedirect("/add/operations")}>
              {" "}
              {/* Updated button path */}
              Add New Operation
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

export default ViewOperations;
