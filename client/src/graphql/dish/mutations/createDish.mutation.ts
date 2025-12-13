import { gql } from "urql";

export const CREATE_DISH_MUTATION = gql`
  mutation CreateDish($input: CreateDishInput!) {
    createDish(createDishInput: $input) {
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
