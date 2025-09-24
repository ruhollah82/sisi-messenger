import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../services/api/apiClient";
import API from "../../../services/api/apiList";
import { setLoading, setAuthData, setError, logout } from "../Slices/authSlice";

// Helper for logging
const logApi = (label, { payload, response, error }) => {
  console.group(`[${label}]`);
  if (payload) console.log("Payload:", payload);
  if (response) console.log("Response:", response);
  if (error) {
    console.error("Error object:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error status:", error.response.status);
    }
  }
  console.groupEnd();
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await apiClient.post(API.AUTH.LOGIN, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });

      if (response.data.code === 1) {
        dispatch(
          setAuthData({
            user: response.data.user,
          })
        );

        // Use SPA navigation instead of window.location
        navigateTo("/chat");

        return response.data;
      } else {
        throw new Error(response.data.msg || "Login failed");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setError(errorMsg));
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk for auto-login after registration
export const autoLoginAfterRegister = createAsyncThunk(
  "auth/autoLogin",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const loginFormData = new URLSearchParams();
      loginFormData.append("email", email);
      loginFormData.append("password", password);

      const loginResponse = await apiClient.post(
        API.AUTH.LOGIN,
        loginFormData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );

      if (loginResponse.data.code === 1) {
        dispatch(
          setAuthData({
            user: loginResponse.data.user,
          })
        );
        return loginResponse.data;
      } else {
        throw new Error(loginResponse.data.msg || "Auto-login failed");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk for registration (without auto-login)
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const formData = new URLSearchParams();
      Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
      });

      const response = await apiClient.post(API.AUTH.REGISTER, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });

      if (response.data.code === 1) {
        // Registration successful, but we won't auto-login here
        return response.data;
      } else {
        throw new Error(response.data.msg || "Registration failed");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setError(errorMsg));
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk for refresh token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        API.AUTH.REFRESH_TOKEN,
        {},
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );

      logApi("Refresh Token", { response });

      if (response.data.code === 1) {
        return response.data;
      } else {
        throw new Error(response.data.msg || "Token refresh failed");
      }
    } catch (error) {
      logApi("Refresh Token Error", { error });
      dispatch(logout());
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await apiClient.post(
        API.AUTH.LOGOUT,
        {},
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      dispatch(logout());
      // Use SPA navigation instead of window.location
      navigateTo("/login");
    }
  }
);
