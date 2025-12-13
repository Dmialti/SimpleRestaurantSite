import { gql } from "urql";

export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      email
      role
    }
  }
`;
