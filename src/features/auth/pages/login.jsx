// src/pages/LoginPage.jsx
import React, { useEffect } from "react";
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
import useApp from "antd/es/app/useApp";
import { baseTokens } from "../../../theme/tokens";
import useAuth from "../../../hooks/useAuth"; // <-- useAuth hook

const { Title } = Typography;
const { useToken } = theme;

const LoginPage = () => {
  const [form] = Form.useForm();
  const { message } = useApp();
  const navigate = useNavigate();
  const { token } = useToken();

  // 🔹 useAuth hook state & actions
  const { login, clearError, isAuthenticated, isLoading, error } = useAuth();

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  // Handle login submission
  const handleLogin = async (values) => {
    const { email, password } = values;
    const result = await login(email, password);

    if (result.success) {
      message.success("ورود موفق!");
      navigate("/chat");
    } else {
      console.error("Login failed:", result.error);
      message.error(result.error || "ورود ناموفق بود");
    }
  };

  return (
    <Flex justify="center" align="center" style={{ width: "100%" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          border: "0",
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
          ورود به سیستم
        </Title>

        <Spin spinning={isLoading}>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={clearError}
              style={{ marginBottom: 16 }}
            />
          )}

          <Form form={form} layout="vertical" onFinish={handleLogin}>
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
                  message: "رمز عبور باید حداقل 6 کاراکتر باشد!",
                },
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
                loading={isLoading}
                icon={<Icon icon="mdi:login" />}
                style={{ marginBottom: 16 }}
              >
                ورود به سیستم
              </Button>

              <Flex justify="space-between">
                <Button
                  type="link"
                  size="small"
                  onClick={() => navigate("/forgetPassword")}
                  style={{ padding: 0 }}
                >
                  فراموشی رمز عبور
                </Button>

                <Button
                  type="link"
                  size="small"
                  onClick={() => navigate("/signup")}
                  style={{ padding: 0 }}
                >
                  ایجاد حساب کاربری
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </Flex>
  );
};

export default LoginPage;
