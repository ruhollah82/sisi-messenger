import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../services/api/apiClient";
import API from "../../../services/api/apiList";
import { setLoading, setAuthData, setError, logout } from "../slices/authSlice";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      // Use URLSearchParams for x-www-form-urlencoded format
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await apiClient.post(API.AUTH.LOGIN, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true, // Important for cookies
      });

      if (response.data.code === 1) {
        dispatch(
          setAuthData({
            user: response.data.user,
            // Tokens are in cookies, not in response
          })
        );
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

// Async thunk for registration
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
        dispatch(
          setAuthData({
            user: response.data.user,
          })
        );
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
      // Since refresh token is in cookies, we don't need to pass it
      const response = await apiClient.post(
        API.AUTH.REFRESH_TOKEN,
        {},
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );

      if (response.data.code === 1) {
        // Tokens are automatically updated in cookies
        return response.data;
      } else {
        throw new Error(response.data.msg || "Token refresh failed");
      }
    } catch (error) {
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
      // No need to pass refresh token as it's in cookies
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
    }
  }
);
