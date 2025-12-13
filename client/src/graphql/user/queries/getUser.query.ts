import { gql } from "urql";

export const GET_USER_QUERY = gql`
  query GetUserById($id: Int!) {
    user(id: $id) {
      id
      email
      role
    }
  }
`;
