import { gql } from "urql";

export const GET_ME_QUERY = gql`
  query GetMe {
    me {
      id
      email
      role
    }
  }
`;
