import type { AuthConfig, AuthUtilities } from "@urql/exchange-auth";
import { REFRESH_MUTATION } from "../../../graphql/auth/mutations/refresh.mutation";

export const authConfig = async (utils: AuthUtilities): Promise<AuthConfig> => {
  return {
    addAuthToOperation(operation) {
      return operation;
    },

    didAuthError(error) {
      return error.graphQLErrors.some(
        (e) =>
          e.extensions?.code === "UNAUTHENTICATED" ||
          e.message === "Token is incorrect or expired" ||
          e.message === "Token not found" ||
          e.message.includes("Unauthorized")
      );
    },

    async refreshAuth() {
      try {
        await utils.mutate(REFRESH_MUTATION, {});
      } catch (error) {
        console.error("Refresh failed", error);
        throw error;
      }
    },
  };
};
