import { gql } from "urql";

export const DELETE_DISH_MUTATION = gql`
  mutation DeleteDish($id: Int!) {
    deleteDishById(id: $id) {
      id
      name
    }
  }
`;
