import React from "react";
import { Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import ThemeToggleButton from "../components/themeToggleButton/themeToggleButton";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: colorBgContainer,
        }}
      >
        <div className="demo-logo" />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={Array.from({ length: 6 }).map((_, i) => ({
            key: i + 1,
            label: `Nav ${i + 1}`,
          }))}
          style={{ flex: 1, minWidth: 0 }}
        />
        <ThemeToggleButton />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Current Page</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet /> {/* Nested routes render here */}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Your Company Name
      </Footer>
    </Layout>
  );
};

export default MainLayout;
