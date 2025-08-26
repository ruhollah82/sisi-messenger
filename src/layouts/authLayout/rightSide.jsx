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
      <Outlet />
    </Flex>
  );
};

export default RightSide;
