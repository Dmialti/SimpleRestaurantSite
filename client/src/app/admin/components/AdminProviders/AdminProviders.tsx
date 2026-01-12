"use client";

import AuthContextProvider from "@/context/AuthContext/AuthContextProvider";
import { client } from "@/urql/urqlClient";
import React from "react";
import { Provider as UrqlProvider } from "urql";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <UrqlProvider value={client}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </UrqlProvider>
  );
}
