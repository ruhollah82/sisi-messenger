import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // optional for redirection
import { logout } from "../../app/store/Slices/authSlice";
import { Button, Typography } from "antd";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // if using React Router
  const { Title } = Typography;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // optional: redirect to login page
  };

  return (
    <>
      <Title>DashboardPage</Title>
      <Button onClick={handleLogout}>خروج از حساب</Button>
      <Title>
        {JSON.parse(localStorage.getItem("authData"))?.user?.first_name}
      </Title>
      <Title>
        {JSON.parse(localStorage.getItem("authData"))?.user?.last_name}
      </Title>
      <Title>
        {JSON.parse(localStorage.getItem("authData"))?.user?.phone_number}
      </Title>
    </>
  );
};

export default DashboardPage;
