import { gql } from "../../codegen/generated";

export const PARAGRAPH_FRAGMENT = gql(`
  fragment ParagraphItemFields on Paragraph {
    id,
    name,
    content,
    position
  }
`);
