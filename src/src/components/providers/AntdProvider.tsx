"use client";

import React, { useEffect, useState } from "react";
import { App, ConfigProvider, theme } from "antd";
import { useAppSelector } from "@/store/hook";
import type { ThemeConfig } from "antd/es/config-provider/context";

interface AntdConfigProviderProps {
  children: React.ReactNode;
}

const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#1677ff",
    borderRadius: 8,
    fontFamily: "var(--font-geist-sans)",
    colorBgBase: "#ffffff",
    colorTextBase: "#1f1f1f",
    colorBorder: "#d9d9d9",
  },
};

const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#1677ff",
    borderRadius: 8,
    fontFamily: "var(--font-geist-sans)",
    colorBgBase: "#111a27",
    colorTextBase: "#e2e8f0",
    colorBorder: "#334155",
  },
  components: {
    Table: {
      headerBg: "#152234",
      borderColor: "#293b54",
    },
  },
};

export const AntdProvider: React.FC<AntdConfigProviderProps> = ({
  children,
}) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <ConfigProvider theme={isDark ? darkTheme : lightTheme}>
      <App>{children}</App>
    </ConfigProvider>
  );
};
