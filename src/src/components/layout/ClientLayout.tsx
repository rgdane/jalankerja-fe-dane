"use client";

import { CookiesProvider } from "react-cookie";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { NotificationProvider } from "@/components/providers/NotificationProvider";
import { AntdProvider } from "@/components/providers/AntdProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <CookiesProvider>
        <AntdProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </AntdProvider>
      </CookiesProvider>
    </ReduxProvider>
  );
}
