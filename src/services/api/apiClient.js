// src/services/api/apiClient.js
import axios from "axios";
import { getBaseURL } from "./apiList";
import API from "./apiList";
import { replaceTo } from "../../utils/navigation"; // Import the navigation utility

// Create axios instance
const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Flag to prevent multiple simultaneous token refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You might want to add any request modifications here
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with token refresh logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Check if this is a refresh token request itself to avoid infinite loops
      if (originalRequest.url.includes(API.AUTH.REFRESH_TOKEN)) {
        // If refresh token request failed, redirect to login using SPA navigation
        replaceTo("/login");
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If we're already refreshing, add this request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        await apiClient.post(
          API.AUTH.REFRESH_TOKEN,
          {},
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true,
          }
        );

        // Process the queue
        processQueue(null);

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, process the queue with error
        processQueue(refreshError, null);

        // Redirect to login using SPA navigation
        replaceTo("/login");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
