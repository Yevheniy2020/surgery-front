import React, { useEffect, useState } from "react";
import Button, { variants } from "../button/Button";
import styles from "./Main.module.css";

const mainNavigation = [
  { name: "Medical Cases", route: "/view/medical-cases" },
  { name: "Diagnoses", route: "/view/diagnoses" },
  { name: "Doctors", route: "/view/doctors" },
  { name: "Insurance", route: "/view/insurance" },
  { name: "Operations", route: "/view/operations" },
  { name: "Case Operations", route: "/view/case-operations" },
  { name: "Patients", route: "/view/patients" },
];

const Main = () => {
  const handleRedirect = (route) => {
    window.location.href = route;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {mainNavigation.map((navItem, index) => (
          <Button
            key={index}
            variant={variants.nav}
            onClick={() => handleRedirect(navItem.route)}
          >
            {navItem.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Main;
