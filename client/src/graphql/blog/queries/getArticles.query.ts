import { gql } from "../../codegen/generated/gql";

export const GET_ARTICLES_QUERY = gql(`
  query GetArticles {
    articles {
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
