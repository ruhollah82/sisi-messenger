import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "../../../utils/coockies";

// Since tokens are stored in cookies, we don't need to manage them in Redux
const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false, // We'll check cookies to determine this
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuthData: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Cookies are handled by the browser/backend
    },
    clearError: (state) => {
      state.error = null;
    },
    checkAuthStatus: (state) => {
      // This will be updated based on cookie checks
      // You might want to implement a proper check here
      state.isAuthenticated = document.cookie.includes("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
      location.reload();
    },
  },
});

// Selectors
export const selectAuthStatus = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

export const {
  setLoading,
  setAuthData,
  setError,
  logout,
  clearError,
  checkAuthStatus,
} = authSlice.actions;
export default authSlice.reducer;
