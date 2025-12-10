import { gql } from "../../codegen/generated";

export const CREATE_ARTICLE_MUTATION = gql(`
  mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(updateArticleInput: $input) {
      id
    }
  }
`);
