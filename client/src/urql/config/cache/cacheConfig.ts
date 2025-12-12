import type { CacheExchangeOpts } from "@urql/exchange-graphcache";
import { updatesConfig } from "./mutations/updatesConfig";

export const cacheConfig: CacheExchangeOpts = {
  keys: {},
  updates: updatesConfig,
};
