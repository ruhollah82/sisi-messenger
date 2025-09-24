// src/App.jsx
import { ThemeProvider } from "./theme/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import router from "./app/router";
import { App as AntdApp } from "antd";
import API from "./services/api/apiList";
import NavigationInitializer from "./components/NavigationInitializer";

export default function App() {
  // Test your API configuration
  console.log("Login endpoint:", API.AUTH.LOGIN);
  console.log("Register endpoint:", API.AUTH.REGISTER);
  console.log("Profile endpoint:", API.PROFILE.GET);

  return (
    <ThemeProvider>
      <AntdApp>
        <RouterProvider router={router}>
          <NavigationInitializer />
        </RouterProvider>
      </AntdApp>
    </ThemeProvider>
  );
}
