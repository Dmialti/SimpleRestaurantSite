import React from "react";
import { AdminProviders } from "./components/AdminProviders/AdminProviders";
import AdminShell from "./components/AdminShell/AdminShell";
import AuthContextProvider from "@/context/AuthContext/AuthContextProvider";
import AdminSmoothScrolling from "./components/AdminSmoothScrolling/AdminSmoothScrolling";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProviders>
      <AdminShell>
        <AdminSmoothScrolling>{children}</AdminSmoothScrolling>
      </AdminShell>
    </AdminProviders>
  );
}
