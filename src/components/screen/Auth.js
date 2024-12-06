import React, { useState } from "react";
import AuthAPI from "../../api/AuthAPI";
import Button from "../button/Button";
import Input from "../input/Input";

const AuthForm = ({ setIsAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      const response = await AuthAPI.login(credentials);
      console.log("Login successful:", response);
      localStorage.setItem("accessToken", response.accessToken);
      setIsAuth(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && (
        <div
          style={{ color: "red", textAlign: "center", marginBottom: "10px" }}
        >
          {errorMessage}
        </div>
      )}
      <div style={{ textAlign: "center" }}>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};

export default AuthForm;
