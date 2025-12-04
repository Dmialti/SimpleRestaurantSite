import { gql } from "../../codegen/generated/gql";

export const GET_MENU_QUERY = gql(`
  query GetMenu {
    getMenu {
      id
      name
      dishes {
        ...DishItemFields
      }
    }
  }
`);
