import axios from "axios";
import { getBaseURL } from "./apiList";
import API_ENDPOINTS from "./apiList";

// Create axios instance
const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Essential for cookie-based authentication
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // No need to manually set Authorization header as cookies are handled automatically
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with token refresh logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        await apiClient.post(
          API_ENDPOINTS.AUTH.REFRESH_TOKEN,
          {},
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true,
          }
        );

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh fails
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
