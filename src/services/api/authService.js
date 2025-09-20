import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiList";

export const authService = {
  login: (credentials) =>
    apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    }),

  register: (userData) =>
    apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    }),

  refreshToken: () =>
    apiClient.post(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      {},
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }
    ),

  logout: () =>
    apiClient.post(
      API_ENDPOINTS.AUTH.LOGOUT,
      {},
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }
    ),
};
