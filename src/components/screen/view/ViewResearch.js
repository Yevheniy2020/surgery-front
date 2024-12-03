import React, { useEffect, useState } from "react";
import ResearchApi from "../../../api/ResearchAPI"; // Updated to use ResearchAPI
import Table from "../../table/Table";
import Button, { variants } from "../../button/Button";
import { useNavigate } from "react-router-dom";

const ViewResearch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResearchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await ResearchApi.deleteResearch(id.researchId);
      console.log(`Deleted medical case with id: ${id.researchId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting medical case:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/research/${id.researchId}`);
  };

  const handleRedirect = (path) => {
    navigate(`${path}`);
  };

  const fetchResearchData = async () => {
    setLoading(true);
    try {
      const fetchedData = await ResearchApi.getAllResearch();
      fetchedData.forEach((element) => {
        if (element.researchesInCases.length !== 0) {
          element.researchesInCasesId = element.researchesInCases
            .map((item) => item.caseId)
            .join(", ");
        } else {
          element.researchesInCasesId = null;
        }
      });
      const filteredData = fetchedData.map(
        ({ researchesInCases, ...rest }) => rest
      );
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
        <div>Loading...</div>
      ) : (
        <>
          <Table
            data={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <div className="buttons-bottom">
            <Button onClick={() => handleRedirect("/add/research")}>
              Add New Research
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

export default ViewResearch;
