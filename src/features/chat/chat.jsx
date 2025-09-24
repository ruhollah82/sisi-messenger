import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  logout,
  selectIsAuthenticated,
} from "../../app/store/Slices/authSlice";
import { fetchProfile } from "../../app/store/Thunks/profileThunks";

import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../../app/store/Slices/profileSlice";
import {
  Button,
  Typography,
  Card,
  Avatar,
  Space,
  Spin,
  Alert,
  Divider,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LogoutOutlined,
  EditOutlined,
  CameraOutlined,
} from "@ant-design/icons";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Title, Text } = Typography;

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const profile = useSelector(selectProfile);
  const isLoading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchProfile());
      // Fetch profile data when component mounts and user is authenticated
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" tip="در حال بارگذاری پروفایل..." />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
          textAlign: "center",
          padding: "20px",
        }}
      >
        {error && (
          <Alert
            message="خطا در دریافت اطلاعات پروفایل"
            description={error}
            type="error"
            style={{ marginBottom: 20 }}
            closable
          />
        )}

        <div style={{ position: "relative", display: "inline-block" }}>
          <Avatar
            size={100}
            src={profile?.avatar}
            icon={!profile?.avatar && <UserOutlined />}
            style={{ marginBottom: 20 }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<CameraOutlined />}
            size="small"
            style={{
              position: "absolute",
              bottom: 15,
              right: -5,
            }}
            onClick={() => navigate("/profile/upload")}
          />
        </div>

        <Title level={3} style={{ marginTop: "15px" }}>
          {profile?.Fname} {profile?.Lname}
        </Title>

        <Text type="secondary" style={{ marginBottom: 20, display: "block" }}>
          @{profile?.username}
        </Text>

        <Divider />

        <Space
          direction="vertical"
          align="start"
          style={{ width: "100%", marginTop: "20px" }}
        >
          {profile?.Fname && (
            <Text style={{ display: "block", marginBottom: 8 }}>
              <UserOutlined style={{ marginLeft: "10px" }} />
              نام: {profile.Fname}
            </Text>
          )}

          {profile?.Lname && (
            <Text style={{ display: "block", marginBottom: 8 }}>
              <UserOutlined style={{ marginLeft: "10px" }} />
              نام خانوادگی: {profile.Lname}
            </Text>
          )}

          {profile?.email && (
            <Text style={{ display: "block", marginBottom: 8 }}>
              <MailOutlined style={{ marginLeft: "10px" }} />
              ایمیل: {profile.email}
            </Text>
          )}

          {profile?.phone_number && (
            <Text style={{ display: "block", marginBottom: 8 }}>
              <PhoneOutlined style={{ marginLeft: "10px" }} />
              تلفن: {profile.phone_number}
            </Text>
          )}
        </Space>

        <Divider />

        <Space direction="vertical" style={{ width: "100%" }}>
          <Button
            type="default"
            onClick={handleEditProfile}
            icon={<EditOutlined />}
            style={{
              borderRadius: "20px",
              width: "100%",
            }}
          >
            ویرایش پروفایل
          </Button>

          <Button
            type="primary"
            danger
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            style={{
              borderRadius: "20px",
              width: "100%",
            }}
          >
            خروج از حساب
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Chat;
