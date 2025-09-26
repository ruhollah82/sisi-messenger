// src/App.jsx
import { useEffect } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import router from "./app/router/router";
import { App as AntdApp, Spin } from "antd";
import useAuth from "./hooks/useAuth";
import API from "./services/api/apiList";

export default function App() {
  const { initializeAuth, isAuthenticated, isLoading, user } = useAuth();

  // Run once on app load
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Debugging (you can remove later)
  console.log("Login endpoint:", API.AUTH.LOGIN);
  console.log("Register endpoint:", API.AUTH.REGISTER);
  console.log("Profile endpoint:", API.PROFILE.GET);
  console.log("User:", user);
  console.log("Authenticated:", isAuthenticated);

  // Optional: show a loading spinner while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Loading session..." />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ThemeProvider>
  );
}
