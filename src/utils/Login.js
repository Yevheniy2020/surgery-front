import { useState } from "react";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      const success = await auth.loginAction(input);
      if (!success) {
        setErrorMessage("Login failed. Please check your credentials.");
      }
      return;
    }

    alert("Please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmitEvent}
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="form_control" style={{ marginBottom: "15px" }}>
          <label
            htmlFor="user-username"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Username:
          </label>
          <input
            type="text"
            id="user-username"
            name="username"
            placeholder="exampleUser"
            aria-describedby="user-username"
            aria-invalid="false"
            onChange={handleInput}
            style={{
              width: "380px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div className="form_control" style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
            style={{
              width: "380px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errorMessage}
          </div>
        )}

        <button
          className="btn-submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
