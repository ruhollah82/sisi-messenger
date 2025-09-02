import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/store/Slices/authSlice";
import { Button, Typography } from "antd";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Title } = Typography;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
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
      تست دپلوی گیتهاب
    </>
  );
};

export default DashboardPage;
