import { gql } from "urql";

export const DELETE_USERS_MUTATION = gql`
  mutation DeleteUsers($ids: [Int!]!) {
    deleteUsers(ids: $ids) {
      count
    }
  }
`;
