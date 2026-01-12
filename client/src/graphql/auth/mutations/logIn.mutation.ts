import { gql } from "../../codegen/generated";

export const LOGIN_MUTATION = gql(`
  mutation Login($input: AuthInput!) {
    logIn(input: $input) {
      accessToken
      refreshToken
    }
  }
`);
