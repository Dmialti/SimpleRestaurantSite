import type { UpdatesConfig } from "@urql/exchange-graphcache";
import type { Mutation } from "../../../../graphql/codegen/generated/graphql";

export const updatesConfig: UpdatesConfig = {
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
