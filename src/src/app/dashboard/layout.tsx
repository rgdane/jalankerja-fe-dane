"use client";
import { Navbar } from "@/components/fragments/Navbar";
import Sidebar from "@/components/fragments/Sidebar";
import React, { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="transition-all duration-300 w-full">
        <Navbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
