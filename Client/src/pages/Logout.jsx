import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Clear user and token
    navigate("/login"); // Redirect to login page
  }, [logout, navigate]);

  // return null; // or
  <p>Logging out...</p>; // or any loading indicator
};

export default Logout;
