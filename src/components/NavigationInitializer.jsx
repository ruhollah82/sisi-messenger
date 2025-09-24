// src/components/NavigationInitializer.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigator } from "../utils/navigation";

const NavigationInitializer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set the navigator function that will be used throughout the app
    setNavigator(navigate);

    // Cleanup on unmount
    return () => {
      setNavigator(null);
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default NavigationInitializer;
