import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiList";
import { getCookie } from "../utils/cookies"; // helper to read cookies

export const authService = {
  login: (credentials) =>
    apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),

  register: (userData) =>
    apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),

  refreshToken: () => {
    const refreshToken = getCookie("refreshToken"); // read cookie manually
    return apiClient.post(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { RefreshToken: refreshToken },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  },

  logout: () => {
    const refreshToken = getCookie("refreshToken"); // read cookie manually
    return apiClient.post(
      API_ENDPOINTS.AUTH.LOGOUT,
      { RefreshToken: refreshToken },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  },
};
