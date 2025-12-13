import type { AuthConfig, AuthUtilities } from "@urql/exchange-auth";
import { jwtDecode } from "jwt-decode";
import {
  getAccessToken,
  setAccessToken,
} from "../../../shared/utils/services/accessToken.service";
import { REFRESH_MUTATION } from "../../../graphql/auth/mutations/refresh.mutation";

interface JwtExpPayload {
  exp: number;
}

export const authConfig = async (utils: AuthUtilities): Promise<AuthConfig> => {
  return {
    addAuthToOperation(operation) {
      const token = getAccessToken();
      if (!token) return operation;
      return utils.appendHeaders(operation, {
        Authorization: `Bearer ${token}`,
      });
    },

    willAuthError() {
      const token = getAccessToken();
      if (!token) return false;

      try {
        const { exp } = jwtDecode<JwtExpPayload>(token);

        if (Date.now() + 10000 > exp * 1000) {
          return true;
        }
      } catch {
        return true;
      }

      return false;
    },

    didAuthError(error) {
      return error.graphQLErrors.some(
        (e) =>
          e.extensions?.code === "UNAUTHENTICATED" ||
          e.message === "Token is incorrect or expired" ||
          e.message === "Token not found"
      );
    },

    async refreshAuth() {
      try {
        const result = await utils.mutate(REFRESH_MUTATION, {});

        if (result.data?.refresh?.accessToken) {
          const newToken = result.data.refresh.accessToken;
          setAccessToken(newToken);
        }
      } catch {
        setAccessToken(null);
      }
    },
  };
};
