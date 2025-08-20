import { ThemeProvider } from "./theme/ThemeProvider";
import Temp from "./components/tempTest";
import LoginPage from "./features/auth/pages/login";
import { RouterProvider } from "react-router-dom";
import router from "./app/router";
import { App as AntdApp } from "antd";

export default function App() {
  return (
    <ThemeProvider>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ThemeProvider>
  );
}
