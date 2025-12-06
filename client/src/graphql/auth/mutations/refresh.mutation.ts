import { gql } from "../../codegen/generated";

export const REFRESH_MUTATION = gql(
  `mutation Refresh { refresh { accessToken } }`
);
