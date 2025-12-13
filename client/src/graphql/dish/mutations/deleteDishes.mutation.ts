import { gql } from "urql";

export const DELETE_DISHES_MUTATION = gql`
  mutation DeleteDishes($ids: [Int!]!) {
    deleteDishes(ids: $ids) {
      count
    }
  }
`;
