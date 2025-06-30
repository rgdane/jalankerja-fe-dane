"use client";

import { Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ThemeSwitch from "./ThemeSwitch";
import Avatar from "../ui/Avatar";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [cookies] = useCookies(["user"]);
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const parsed =
        typeof cookies.user === "string"
          ? JSON.parse(cookies.user)
          : cookies.user;
      const firstName = parsed.name.split(" ")[0].toLowerCase();
      parsed.name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      setUser(parsed);
    } catch (error) {
      console.warn("Gagal parse user dari cookie:", error);
      setUser(null);
    }
  }, [cookies.user]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>Profil</span>,
    },
    {
      key: "2",
      danger: true,
      label: <span>Logout</span>,
    },
  ];

  return (
    <div className="bg-white dark:bg-[#152234] dark:text-white dark:border-white/10 transition-colors dark:border-b w-full flex justify-end px-8 py-4 ">
      <div className="flex items-center gap-x-4">
        <ThemeSwitch />
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div className="flex items-center gap-x-2 cursor-pointer select-none">
            <Avatar icon={<UserOutlined />} />
            <span>{mounted ? user?.name ?? "Guest" : ""}</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
