import React from "react";
import { variants } from "../Button/Button";
import styles from "./Table.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Table = ({ data }) => {
  const navigate = useNavigate();

  const handleRedirect = (path, params) => {
    navigate(`${path}/${params}`);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
            <td>
              <div className={styles.actions}>
                <Button
                  variant={variants.view}
                  onClick={() => handleRedirect("/view", item.caseId)}
                >
                  View
                </Button>
                <Button
                  variant={variants.edit}
                  onClick={() => handleRedirect("/view", item.caseId)}
                >
                  Edit
                </Button>
                <Button
                  variant={variants.delete}
                  onClick={() => handleDelete(item.caseId)}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
