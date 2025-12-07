import { createContext } from "react";
import type { User } from "./interfaces/User.interface";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logIn: (email: string, pass: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
