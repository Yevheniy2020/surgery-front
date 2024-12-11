import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useTokenCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("site");

      if (!token) {
        return false; // No token found
      }

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token expired
          return false;
        }
        return true; // Token valid
      } catch (error) {
        console.error("Token validation error:", error); // Log error for debugging
        return false; // Invalid token
      }
    };

    const isValid = checkTokenExpiration();

    if (!isValid) {
      navigate("/login"); // Redirect to login if token is expired or invalid
    }
  }, [navigate]);
};
