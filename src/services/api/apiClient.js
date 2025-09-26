// src/services/api/apiClient.js
import axios from "axios";
import { getBaseURL } from "./apiList";
import { getCookie } from "../../utils/coockies"; // helper to read cookies

const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials not needed for header-based JWT
});

// Add Authorization header automatically if accessToken exists
apiClient.interceptors.request.use((config) => {
  const token = getCookie("accessToken"); // or store in memory
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle refresh token logic
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes("/Auth/refreshtoken")) {
        // refresh token itself failed → redirect to login
        // window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Send refresh token from cookie explicitly in body
        const refreshToken = getCookie("refreshToken");
        const response = await apiClient.post("/Auth/refreshtoken", {
          RefreshToken: refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        // Save new access token in cookie
        document.cookie = `accessToken=${newAccessToken}; path=/;`;

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
