// src/redux/thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../services/api/apiClient";
import API from "../../../services/api/apiList";
import { setLoading, setAuthData, setError } from "../Slices/authSlice";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await apiClient.post(API.postLogin, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.code === 1) {
        dispatch(
          setAuthData({
            user: response.data.user,
            token: response.data.token,
            refreshToken: response.data.refreshToken,
          })
        );
        return response.data;
      } else {
        throw new Error(response.data.msg || "Login failed");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setError(errorMsg));
      throw error;
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
      });

      const response = await apiClient.post(API.postRegister, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.code === 1) {
        dispatch(
          setAuthData({
            user: response.data.user,
            token: response.data.token,
            refreshToken: response.data.refreshToken,
          })
        );
        return response.data;
      } else {
        throw new Error(response.data.msg || "Registration failed");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setError(errorMsg));
      throw error;
    }
  }
);

// Async thunk for refresh token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("RefreshToken", refreshToken);

      const response = await apiClient.post(API.postRefreshToken, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.code === 1) {
        dispatch(
          setAuthData({
            token: response.data.token,
            refreshToken: response.data.refreshToken,
          })
        );
        return response.data;
      } else {
        throw new Error(response.data.msg || "Token refresh failed");
      }
    } catch (error) {
      dispatch(logout());
      throw error;
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const formData = new FormData();
        formData.append("RefreshToken", refreshToken);

        await apiClient.post(API.postLogout, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      dispatch(logout());
    }
  }
);
