"use client";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/navigation";
import { navigationItems } from "@/navigation";
import Sider from "antd/es/layout/Sider";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar-collapsed", JSON.stringify(next));
      return next;
    });
  };

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored !== null) {
      setCollapsed(JSON.parse(stored));
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={256}
      className="h-screen fixed z-[9999] left-0 top-0"
    >
      <div className="flex items-center justify-center h-[64px] dark:text-white font-bold text-lg dark:bg-[#152234] bg-white">
        {collapsed ? "A" : "App Name"}
      </div>
      <Menu
        onClick={onClick}
        mode="inline"
        items={navigationItems}
        defaultSelectedKeys={["13"]}
        style={{ height: "calc(100% - 64px)", borderRight: 0 }}
      />
      <div
        className="absolute bottom-0 w-full text-center py-2 cursor-pointer text-white bg-white"
        onClick={toggleCollapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </Sider>
  );
};

export default Sidebar;
