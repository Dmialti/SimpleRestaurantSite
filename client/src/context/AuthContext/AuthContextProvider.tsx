import React, { useEffect, useState, type ReactNode } from "react";
import type { User } from "./interfaces/User.interface";
import { useClient } from "urql";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "./interfaces/JWTPayload.interface";
import { REFRESH_MUTATION } from "../../graphql/auth/mutations/refresh.mutation";
import { LOGIN_MUTATION } from "../../graphql/auth/mutations/logIn.mutation";
import { LOGOUT_MUTATION } from "../../graphql/auth/mutations/logOut.mutation";
import { AuthContext } from "./AuthContext";
import { setAccessToken } from "../../shared/utils/services/accessToken.service";

interface AuthContextProviderProps {
  children?: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const client = useClient();

  const handleToken = (token: string) => {
    setAccessToken(token);
    const decoded = jwtDecode<JwtPayload>(token);
    setUser({ id: decoded.sub, email: decoded.email, role: decoded.role });
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const result = await client.mutation(REFRESH_MUTATION, {}).toPromise();
        if (result.data?.refresh?.accessToken) {
          handleToken(result.data.refresh.accessToken);
        }
      } catch {
        console.log("No active session");
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [client]);

  const logIn = async (email: string, password: string) => {
    const result = await client
      .mutation(LOGIN_MUTATION, { input: { email, password } })
      .toPromise();

    if (result.error) {
      const graphQLError = result.error.graphQLErrors[0];

      if (graphQLError) {
        throw new Error(graphQLError.message);
      }

      throw new Error(result.error.message.replace("[GraphQL] ", ""));
    }

    if (result.data?.logIn?.accessToken) {
      handleToken(result.data.logIn.accessToken);
    }
  };

  const logOut = async () => {
    await client.mutation(LOGOUT_MUTATION, {}).toPromise();
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
