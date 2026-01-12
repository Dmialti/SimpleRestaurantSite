"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { GET_ME_QUERY } from "../../graphql/user/queries/getMe.query";
import { LOGOUT_MUTATION } from "../../graphql/auth/mutations/logOut.mutation";
import { client } from "@/urql/urqlClient";
import { AuthContext } from "./AuthContext";
import { User } from "./interfaces/User.interface";

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const checkSession = useCallback(async () => {
    try {
      setLoading(true);

      const result = await client
        .query(GET_ME_QUERY, {}, { requestPolicy: "network-only" })
        .toPromise();

      if (result.data?.me) {
        console.log("Session active:", result.data.me.email);
        setUser(result.data.me);
      } else {
        console.log("No active session");
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const logOut = async () => {
    try {
      await client.mutation(LOGOUT_MUTATION, {}).toPromise();

      setUser(null);

      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, checkSession, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
