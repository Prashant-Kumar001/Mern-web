import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use navigate to programmatically redirect
import { useData } from "../store/login.user"; // For setting user data to null

const LogOut = () => {
  const { setUserData } = useData();
  const navigate = useNavigate(); // Activate the useNavigate hook
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  useEffect(() => {
    setUserData({ name: '', email: '' }); // Clear user data when logging out
    // You could also clear tokens or session info here if needed
    navigate("/login"); // Redirect to login page
  }, [setUserData, navigate]); // Make sure useEffect re-runs if these values change

  return null; // Component doesn't need to render anything
};

export default LogOut;
