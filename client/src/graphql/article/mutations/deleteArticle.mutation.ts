import { gql } from "../../codegen/generated";

export const DELETE_ARTICLE_MUTATION = gql(`
  mutation DeleteArticle($id: Float!) {
    deleteArticleById(id: $id) {
      id
    }
  }
`);
