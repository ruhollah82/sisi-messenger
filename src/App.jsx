import { ThemeProvider } from "./theme/ThemeProvider";
import Temp from "./components/tempTest";
import LoginPage from "./features/auth/pages/login";
import { RouterProvider } from "react-router-dom";
import router from "./app/router";
import { App as AntdApp } from "antd";
import API from "./services/api/apiList";

export default function App() {
  // Test your API configuration
  console.log("Login endpoint:", API.AUTH.LOGIN);
  console.log("Register endpoint:", API.AUTH.REGISTER);
  console.log("Profile endpoint:", API.PROFILE.GET);
  return (
    <ThemeProvider>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ThemeProvider>
  );
}
