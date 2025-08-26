import { Button, Card, Divider, Flex, Space, theme, Typography } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
const { Title } = Typography;
import { baseTokens } from "../../theme/tokens";
const { useToken } = theme;
import logo from "../../assets/images/icon/logo-with-name.svg";

const RightSide = () => {
  const navigate = useNavigate();
  const token = useToken();
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        background: "transparent",
        padding: 0,
        height: "100%",
        width: "100%",
        border: 0,
        flexDirection: "column",
      }}
    >
      <Card
        style={{
          border: 0,
          background: "transparent",
          width: "100%",
        }}
      >
        <Divider
          orientation="center"
          style={{
            margin: `${token.marginLG}px 0`,
            borderColor: baseTokens.token.neutral7,
          }}
        >
          <img src={logo} alt="logo" />
        </Divider>
      </Card>
      <Card
        style={{
          marginTop: 24,
          background: "transparent",
          border: 0,
          padding: 0,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Outlet />

        <Divider style={{ margin: `${token.marginLG}px 0` }} />
        <Space>
          <Button type="link" size="small" onClick={() => navigate("/terms")}>
            شرایط خدمات
          </Button>
          <Button type="link" size="small" onClick={() => navigate("/privacy")}>
            سیاست حفظ حریم خصوصی
          </Button>
        </Space>
      </Card>
    </Flex>
  );
};

export default RightSide;
