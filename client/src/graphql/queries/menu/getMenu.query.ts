import { gql } from "urql";

export const GET_MENU_QUERY = gql`
  query GetMenu {
    getMenu {
      id
      name
      dishes {
        id
        name
        description
        price
        image
      }
    }
  }
`;
