// src/hooks/useAuth.js
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
  autoLoginAfterRegister,
} from "../app/store/Thunks/authThunk";
import {
  selectIsAuthenticated,
  selectUser,
  selectAuthStatus,
  selectAuthError,
  clearError,
} from "../app/store/Slices/authSlice";
import { extractErrorMessage } from "../utils/errorHandler"; // optional

// Small logger utility
const logAuth = (action, { input, result, error }) => {
  console.group(`[Auth Hook] ${action}`);
  if (input) console.log("➡️ Input:", input);
  if (result) console.log("✅ Result:", result);
  if (error) console.error("❌ Error:", error);
  console.groupEnd();
};

export const useAuth = () => {
  const dispatch = useDispatch();

  // Selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  // ✅ Initialize auth status on app load / refresh
  const initializeAuth = useCallback(async () => {
    try {
      const result = await dispatch(refreshToken()).unwrap();

      // If backend responds with valid user + token
      if (result?.user) {
        dispatch(setAuthData({ user: result.user }));
        logAuth("InitializeAuth", { result });
        return { success: true, user: result.user };
      } else {
        dispatch(logout());
        return { success: false };
      }
    } catch (err) {
      const msg = extractErrorMessage(err, "Session expired");
      dispatch(logout());
      logAuth("InitializeAuth", { error: msg });
      return { success: false, error: msg };
    }
  }, [dispatch]);

  // =================
  // Auth Actions
  // =================

  // Auth actions
  const login = useCallback(
    async (email, password) => {
      try {
        const result = await dispatch(loginUser({ email, password })).unwrap();
        logAuth("Login", { input: { email }, result });
        return { success: true, data: result };
      } catch (err) {
        const msg = extractErrorMessage(err, "Login failed");
        logAuth("Login", { input: { email }, error: msg });
        return { success: false, error: msg };
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (userData) => {
      try {
        const result = await dispatch(registerUser(userData)).unwrap();
        logAuth("Register", { input: userData, result });
        return { success: true, data: result };
      } catch (err) {
        const msg = extractErrorMessage(err, "Registration failed");
        logAuth("Register", { input: userData, error: msg });
        return { success: false, error: msg };
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    try {
      const result = await dispatch(logoutUser()).unwrap();
      logAuth("Logout", { result });
      return { success: true };
    } catch (err) {
      const msg = extractErrorMessage(err, "Logout failed");
      logAuth("Logout", { error: msg });
      return { success: false, error: msg };
    }
  }, [dispatch]);

  const refresh = useCallback(async () => {
    try {
      const result = await dispatch(refreshToken()).unwrap();
      logAuth("Refresh Token", { result });
      return { success: true, data: result };
    } catch (err) {
      const msg = extractErrorMessage(err, "Refresh failed");
      logAuth("Refresh Token", { error: msg });
      return { success: false, error: msg };
    }
  }, [dispatch]);

  const autoLogin = useCallback(
    async (email, password) => {
      try {
        const result = await dispatch(
          autoLoginAfterRegister({ email, password })
        ).unwrap();
        logAuth("Auto Login After Register", { input: { email }, result });
        return { success: true, data: result };
      } catch (err) {
        const msg = extractErrorMessage(err, "Auto login failed");
        logAuth("Auto Login After Register", { input: { email }, error: msg });
        return { success: false, error: msg };
      }
    },
    [dispatch]
  );

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
    logAuth("Clear Error", { result: "Cleared auth error" });
  }, [dispatch]);

  return {
    // State
    isAuthenticated,
    user,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    refresh,
    autoLogin,
    clearError: clearAuthError,
    initializeAuth,

    // Helper properties
    isLoggedIn: isAuthenticated,
    currentUser: user,
  };
};

export default useAuth;
