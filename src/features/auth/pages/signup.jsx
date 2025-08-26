// src/pages/SignUpPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Spin,
  Alert,
  Typography,
  Flex,
  theme,
} from "antd";
import { Icon } from "@iconify/react";
import { registerUser } from "../../../app/store/Thunks/authThunk";
import {
  clearError,
  selectAuthStatus,
  selectAuthError,
  selectIsAuthenticated,
} from "../../../app/store/Slices/authSlice";
import useApp from "antd/es/app/useApp";
import { baseTokens } from "../../../theme/tokens";

const { Title } = Typography;
const { useToken } = theme;

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { message } = useApp();

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { token } = useToken();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (values) => {
    try {
      const response = await dispatch(
        registerUser({
          email: values.email,
          pass1: values.password,
          pass2: values.confirmPassword,
          username: values.username,
          Fname: values.firstName,
          Lname: values.lastName,
        })
      ).unwrap();

      console.log("Registration successful:", response);
      message.success("ثبت‌نام موفق!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
      message.error("ثبت‌نام ناموفق بود");
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", padding: 0, minHeight: "100vh" }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: 24,
          border: 0,
          backgroundColor: "transparent",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 30,
            color: baseTokens.token.primary10,
          }}
        >
          ایجاد حساب کاربری
        </Title>

        <Spin spinning={status === "loading"}>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={() => dispatch(clearError())}
              style={{ marginBottom: 16 }}
            />
          )}

          <Form form={form} layout="vertical" onFinish={handleRegister}>
            <Flex gap={12}>
              <Form.Item
                name="firstName"
                label="نام"
                rules={[
                  {
                    required: true,
                    message: "لطفا نام خود را وارد کنید!",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Input placeholder="نام" size="large" />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="نام خانوادگی"
                rules={[
                  {
                    required: true,
                    message: "لطفا نام خانوادگی خود را وارد کنید!",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Input placeholder="نام خانوادگی" size="large" />
              </Form.Item>
            </Flex>

            <Form.Item
              name="username"
              label="نام کاربری"
              rules={[
                {
                  required: true,
                  message: "لطفا نام کاربری خود را وارد کنید!",
                },
                {
                  min: 3,
                  message: "نام کاربری باید حداقل 3 کاراکتر باشد!",
                },
              ]}
            >
              <Input
                prefix={<Icon icon="mdi:account-outline" />}
                placeholder="نام کاربری"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="ایمیل"
              rules={[
                {
                  required: true,
                  message: "لطفا ایمیل خود را وارد کنید!",
                },
                {
                  type: "email",
                  message: "لطفا یک ایمیل معتبر وارد کنید!",
                },
              ]}
            >
              <Input
                prefix={<Icon icon="ic:outline-email" />}
                placeholder="example@domain.com"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="رمز عبور"
              rules={[
                {
                  required: true,
                  message: "لطفا رمز عبور خود را وارد کنید!",
                },
                {
                  min: 6,
                  message: "رمز عبور باید حداقل ۶ کاراکتر باشد!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<Icon icon="mdi:password-outline" />}
                placeholder="••••••"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="تکرار رمز عبور"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "لطفا تکرار رمز عبور را وارد کنید!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("رمز عبور مطابقت ندارد!");
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<Icon icon="mdi:password-outline" />}
                placeholder="••••••"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={status === "loading"}
                icon={<Icon icon="mdi:account-plus" />}
                style={{ marginBottom: 16 }}
              >
                ایجاد حساب کاربری
              </Button>

              <Flex justify="center">
                <Button
                  type="link"
                  size="small"
                  onClick={() => navigate("/login")}
                >
                  حساب دارید؟ وارد شوید
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </Flex>
  );
};

export default SignUpPage;
