import { Layout, Grid } from "antd";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";
import { useLocation } from "react-router-dom";
import { baseTokens } from "../../theme/tokens";
const { useBreakpoint } = Grid;

const AuthLayout = () => {
  const screens = useBreakpoint();
  const location = useLocation();
  const mod = location.pathname.includes("signup") ? "signup" : "login";

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        background: baseTokens.token.bg3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* LeftSide (Image Section) */}
        {screens.md && (
          <div
            style={{
              flex: 7,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LeftSide mod={mod} />
          </div>
        )}
        {/* RightSide (Form Section) */}
        <div
          style={{
            flex: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <RightSide />
        </div>
      </div>
    </Layout>
  );
};

export default AuthLayout;
