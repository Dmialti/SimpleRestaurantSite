import { gql } from "../../codegen/generated/gql";

export const DISH_FRAGMENT = gql(`
  fragment DishItemFields on Dish {
    id
    name
    description
    price
    imageSrc
  }
`);
