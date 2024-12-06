import React, { useEffect, useState } from "react";
import Button, { variants } from "../button/Button";
import styles from "./Main.module.css";
import AuthForm from "./Auth"; // Import the AuthForm component

const mainNavigation = [
  { name: "Medical Cases", route: "/view/medical-cases" },
  { name: "Diagnoses", route: "/view/diagnoses" },
  { name: "Doctors", route: "/view/doctors" },
  { name: "Insurance", route: "/view/insurance" },
  { name: "Operations", route: "/view/operations" },
  { name: "Research", route: "/view/research" },
];

const Main = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuth(true);
    }
  }, []);

  const handleRedirect = (route) => {
    window.location.href = route;
  };

  return (
    <div className={styles.wrapper}>
      {!isAuth ? <AuthForm setIsAuth={setIsAuth} /> : null}
      {isAuth && (
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
      )}
    </div>
  );
};

export default Main;
