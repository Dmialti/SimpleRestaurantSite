"use client";

import { createContext } from "react";
import type { User } from "./interfaces/User.interface";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logOut: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
