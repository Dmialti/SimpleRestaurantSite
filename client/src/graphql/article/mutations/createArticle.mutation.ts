import { gql } from "../../codegen/generated";

export const CREATE_ARTICLE_MUTATION = gql(`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(createArticleInput: $input) {
      id
    }
  }
`);
