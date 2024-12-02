import React from "react";
import Button from "../../common/Button/Button";
import { useParams } from "react-router-dom";

const ViewMedicalCase = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Item - {id}</h1>
      <Button variant="edit">Save Changes</Button>
      <Button variant="delete">Delete Item</Button>
    </div>
  );
};

export default ViewMedicalCase;
