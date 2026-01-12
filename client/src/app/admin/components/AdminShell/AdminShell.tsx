"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BasePageLayout from "@/shared/components/BasePageLayout/BasePageLayout";
import Button from "@/shared/components/Button/Button";
import { NAV_LINKS } from "./static/NAV_LINKS";
import adminImg from "@/assets/AdminPageMaterials/adminIcon.png";
import AuthContextProvider from "@/context/AuthContext/AuthContextProvider";
import { client } from "@/urql/urqlClient";
import { Provider as UrqlProvider } from "urql";
import { useAuth } from "@/shared/hooks/useAuth.hook";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await logOut();
      router.push("/admin/login");
    }
  };

  return (
    <UrqlProvider value={client}>
      <AuthContextProvider>
        <BasePageLayout
          isScreenHeight={true}
          heroCardProps={{
            heading: ["ADMIN", "PANEL"],
            mediaType: "image",
            imageProps: { src: adminImg, alt: "Admin Panel" },
          }}
          className="flex flex-row p-0 overflow-hidden"
        >
          <aside className="w-64 border-r border-border-default h-full flex flex-col justify-between p-8 bg-black/20 backdrop-blur-sm shrink-0">
            <div className="flex flex-col gap-8">
              <div className="text-text-muted font-satoshi text-xs tracking-widest uppercase opacity-50">
                Navigation
              </div>

              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`text-lg font-forum tracking-wide transition-all duration-300 hover:pl-2 ${
                        isActive
                          ? "text-white border-l-2 border-primary-default pl-4"
                          : "text-text-default hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-px w-full bg-border-default/30" />
              <Button
                variant="border"
                className="w-full py-3 text-xs text-red-400 border-red-900/50 hover:bg-red-900/20"
                onClick={handleLogout}
              >
                LOG OUT
              </Button>
            </div>
          </aside>

          <main className="flex-1 h-full overflow-y-auto bg-black/10 p-10 relative">
            {children}
          </main>
        </BasePageLayout>
      </AuthContextProvider>
    </UrqlProvider>
  );
}
