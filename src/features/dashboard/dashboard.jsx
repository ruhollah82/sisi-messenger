import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/store/Slices/authSlice";
import { Button, Typography, Card, Avatar, Space } from "antd";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const authData = JSON.parse(localStorage.getItem("authData"));
  const user = authData?.user;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Card
        style={{
          width: 350,
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
          textAlign: "center",
          padding: "20px",
        }}
        actions={[
          <Button
            type="primary"
            danger
            onClick={handleLogout}
            style={{ borderRadius: "20px" }}
          >
            خروج از حساب
          </Button>,
        ]}
      >
        <Avatar size={100} icon={<UserOutlined />} />
        <Title level={3} style={{ marginTop: "15px" }}>
          {user?.first_name} {user?.last_name}
        </Title>
        <Space direction="vertical" align="start" style={{ marginTop: "20px" }}>
          <Text>
            <UserOutlined style={{ marginRight: "10px" }} />
            {user?.first_name}
          </Text>
          <Text>
            <UserOutlined style={{ marginRight: "10px" }} />
            {user?.last_name}
          </Text>
          <Text>
            <PhoneOutlined style={{ marginRight: "10px" }} />
            {user?.phone_number}
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default DashboardPage;
