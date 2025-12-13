import { gql } from "urql";

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: Int!) {
    deleteUserById(id: $id) {
      id
      email
    }
  }
`;
