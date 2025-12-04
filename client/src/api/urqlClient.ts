import { createClient, fetchExchange } from "urql";
import {
  cacheExchange,
  type CacheExchangeOpts,
  type UpdatesConfig,
} from "@urql/exchange-graphcache";
import type { Mutation } from "../graphql/codegen/generated/graphql";

const updates: UpdatesConfig = {
  Mutation: {
    createDish: (result: Mutation, _args, cache) => {
      if (result.createDish) {
        cache.invalidate({ __typename: "Query", fieldName: "getMenu" });
      }
    },

    createCategory: (result: Mutation, _args, cache) => {
      if (result.createCategory) {
        cache.invalidate({ __typename: "Query", fieldName: "getMenu" });
      }
    },
  },
};

const cacheConfig: CacheExchangeOpts = {
  keys: {},
  updates: updates,
};

export const client = createClient({
  url: "http://localhost:3000/graphql",
  exchanges: [cacheExchange(cacheConfig), fetchExchange],
});
