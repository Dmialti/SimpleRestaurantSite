import { gql } from "../../codegen/generated";

export const GET_ARTICLE_QUERY = gql(`
  query GetArticle($id: Int!) {
    article(id: $id) {
      id
      name
      description
      publicationDate
      imageSrc
      paragraphs {
        ...ParagraphItemFields
      }
    }
  }
`);
