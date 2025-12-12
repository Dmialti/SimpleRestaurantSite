import { gql } from "../../codegen/generated";

export const UPDATE_ARTICLE_MUTATION = gql(`
  mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(updateArticleInput: $input) {
      id
    }
  }
`);
