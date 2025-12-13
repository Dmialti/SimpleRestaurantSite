import { gql } from "urql";

export const GET_DISHES_QUERY = gql`
  query GetDishes {
    dishes {
      id
      name
      description
      price
      imageSrc
      available
      category {
        id
        name
      }
    }
  }
`;
