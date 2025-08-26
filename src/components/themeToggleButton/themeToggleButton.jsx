import React from "react";
import { Button, Space } from "antd";
import { Icon } from "@iconify/react";
import { useThemeMode } from "../../theme/ThemeProvider";

export default function ThemeToggleButton({ children }) {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Button
      onClick={toggleTheme}
      shape="circle"
      style={{ backgroundColor: "transparent" }}
    >
      {children ? (
        children
      ) : (
        <Icon icon={mode === "light" ? "ph:moon-bold" : "ph:sun-bold"} />
      )}
    </Button>
  );
}
