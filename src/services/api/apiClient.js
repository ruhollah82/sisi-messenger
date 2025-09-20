// src/services/api/apiClient.js
import axios from "axios";
import { getBaseURL } from "./apiList"; // Import the function, not the API object

// Create axios instance with correct base URL
const apiClient = axios.create({
  baseURL: getBaseURL(), // Use the function directly
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log("Making request to:", config.url);
    console.log("Full URL:", config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
