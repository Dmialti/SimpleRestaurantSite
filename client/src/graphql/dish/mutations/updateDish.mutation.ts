import { gql } from "urql";

export const UPDATE_DISH_MUTATION = gql`
  mutation UpdateDish($input: UpdateDishInput!) {
    updateDish(updateDishInput: $input) {
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
