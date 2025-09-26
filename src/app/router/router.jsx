import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../features/auth/pages/login";
import SignUpPage from "../../features/auth/pages/signup";
import AuthLayout from "../../layouts/authLayout/authLayout";
import MainLayout from "../../layouts/mainLayout";
import DashboardPage from "../../features/chat/chat";
import LandingPage from "../pages/landingPage";
import PrivateRoute from "./PrivateRoute";

const UsersPage = () => <div>Users Management</div>;

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "/chat",
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
