import {
  AppstoreOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const generalGroup: MenuItem = {
  key: "grp",
  label: "General",
  type: "group",
  children: [
    {
      key: "/dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "/dashboard/squad",
      label: "Squad",
      icon: <TeamOutlined />,
    },
    {
      key: "/dashboard/user",
      label: "User",
      icon: <UserOutlined />,
    },
    {
      key: "/dashboard/project",
      label: "Project",
      icon: <AppstoreOutlined />,
    },
  ],
};
