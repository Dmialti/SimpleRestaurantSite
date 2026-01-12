import { createClient, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { authExchange } from "@urql/exchange-auth";
import { cacheConfig } from "./config/cache/cacheConfig";
import { authConfig } from "./config/auth/authConfig";

export const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    cacheExchange(cacheConfig),
    authExchange(authConfig),
    fetchExchange,
  ],
});
