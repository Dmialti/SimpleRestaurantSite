import { gql } from "urql";

export const GET_DISH_QUERY = gql`
  query GetDish($id: Int!) {
    dish(id: $id) {
      id
      name
      description
      price
      imageSrc
      available
      categoryId
    }
  }
`;
