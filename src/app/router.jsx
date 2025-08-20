import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/login";
import AuthLayout from "../layouts/authLayout/authLayout";
import MainLayout from "../layouts/mainLayout";
import DashboardPage from "../features/dashboard/dashboard";
import LandingPage from "./pages/landingPage";
import SignUpPage from "../features/auth/pages/signup";

const UsersPage = () => <div>Users Management</div>;

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      //   { path: "/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      // Add other protected routes here
    ],
  },
]);

export default router;
