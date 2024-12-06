import React, { useEffect, useState } from "react";
import DoctorApi from "../../../api/DoctorAPI";
import Table from "../../table/Table";
import Button, { variants } from "../../button/Button";
import { useNavigate } from "react-router-dom";

const ViewDoctors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorsData();
  }, []);

  const handleRedirect = (path) => {
    navigate(`${path}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/doctors/${id.doctorId}`);
  };

  const handleAssignOperation = (id) => {
    navigate(`/assign/operation/${id.doctorId}`);
  };

  const handleAssignMedicalCase = (id) => {
    navigate(`/assign/medical-case/${id.doctorId}`);
  };

  const handleDelete = async (id) => {
    try {
      await DoctorApi.deleteDoctor(id.doctorId);
      console.log(`Deleted doctor with id: ${id.doctorId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const fetchDoctorsData = async () => {
    setLoading(true);
    try {
      const fetchedData = await DoctorApi.getAllDoctors();
      fetchedData.forEach((element) => {
        if (element.doctorsInCaseOperations.length !== 0) {
          element.doctorsInCaseOperationsId = element.doctorsInCaseOperations
            .map((item) => item.caseOperationId)
            .join(", ");
        } else {
          element.doctorsInCaseOperationsId = null;
        }

        if (element.doctorsInChargeOfCases.length !== 0) {
          element.doctorsInChargeOfCasesId = element.doctorsInChargeOfCases
            .map((item) => item.caseId)
            .join(", ");
        } else {
          element.doctorsInChargeOfCasesId = null;
        }
      });
      const filteredData = fetchedData.map(
        ({ doctorsInCaseOperations, doctorsInChargeOfCases, ...rest }) => rest
      );
      setData(filteredData);
      console.log(fetchedData);
    } catch (error) {
      console.error("Error fetching doctors data:", error);
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
            isAssigns={true}
            handleAssignOperation={handleAssignOperation}
            handleAssignMedicalCase={handleAssignMedicalCase}
          />
          <div className="buttons-bottom">
            <Button onClick={() => handleRedirect("/add/doctors")}>
              Add New Doctor
            </Button>
            <Button
              variant={variants.nav}
              onClick={() => handleRedirect("/view/busy-doctors")}
            >
              Busy Doctors
            </Button>
            <Button
              variant={variants.nav}
              onClick={() => handleRedirect("/view/best-doctors")}
            >
              Best Doctors
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

export default ViewDoctors;
