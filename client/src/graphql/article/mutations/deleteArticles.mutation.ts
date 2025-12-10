import { gql } from "../../codegen/generated";

export const DELETE_ARTICLES_MUTATION = gql(`
  mutation DeleteArticles($ids: [Int!]!) {
    deleteArticles(ids: $ids) {
      count
    }
  }
`);
