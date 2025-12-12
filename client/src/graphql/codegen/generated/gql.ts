/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment ParagraphItemFields on Paragraph {\n    id,\n    name,\n    content,\n    position\n  }\n": typeof types.ParagraphItemFieldsFragmentDoc,
    "\n  mutation CreateArticle($input: CreateArticleInput!) {\n    createArticle(createArticleInput: $input) {\n      id\n    }\n  }\n": typeof types.CreateArticleDocument,
    "\n  mutation DeleteArticle($id: Float!) {\n    deleteArticleById(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteArticleDocument,
    "\n  mutation DeleteArticles($ids: [Int!]!) {\n    deleteArticles(ids: $ids) {\n      count\n    }\n  }\n": typeof types.DeleteArticlesDocument,
    "\n  mutation UpdateArticle($input: UpdateArticleInput!) {\n    updateArticle(updateArticleInput: $input) {\n      id\n    }\n  }\n": typeof types.UpdateArticleDocument,
    "\n  query GetArticle($id: Int!) {\n    article(id: $id) {\n      id\n      name\n      description\n      publicationDate\n      imageSrc\n      paragraphs {\n        ...ParagraphItemFields\n      }\n    }\n  }\n": typeof types.GetArticleDocument,
    "\n  mutation Login($input: AuthInput!) {\n    logIn(input: $input) { accessToken }\n  }\n": typeof types.LoginDocument,
    "mutation Logout { logOut }": typeof types.LogoutDocument,
    "mutation Refresh { refresh { accessToken } }": typeof types.RefreshDocument,
    "\n  query GetArticles {\n    articles {\n      id\n      name\n      description\n      publicationDate\n      imageSrc\n    }\n  }\n": typeof types.GetArticlesDocument,
    "\n  fragment DishItemFields on Dish {\n    id\n    name\n    description\n    price\n    imageSrc\n  }\n": typeof types.DishItemFieldsFragmentDoc,
    "\n  query GetMenu {\n    getMenu {\n      id\n      name\n      dishes {\n        ...DishItemFields\n      }\n    }\n  }\n": typeof types.GetMenuDocument,
};
const documents: Documents = {
    "\n  fragment ParagraphItemFields on Paragraph {\n    id,\n    name,\n    content,\n    position\n  }\n": types.ParagraphItemFieldsFragmentDoc,
    "\n  mutation CreateArticle($input: CreateArticleInput!) {\n    createArticle(createArticleInput: $input) {\n      id\n    }\n  }\n": types.CreateArticleDocument,
    "\n  mutation DeleteArticle($id: Float!) {\n    deleteArticleById(id: $id) {\n      id\n    }\n  }\n": types.DeleteArticleDocument,
    "\n  mutation DeleteArticles($ids: [Int!]!) {\n    deleteArticles(ids: $ids) {\n      count\n    }\n  }\n": types.DeleteArticlesDocument,
    "\n  mutation UpdateArticle($input: UpdateArticleInput!) {\n    updateArticle(updateArticleInput: $input) {\n      id\n    }\n  }\n": types.UpdateArticleDocument,
    "\n  query GetArticle($id: Int!) {\n    article(id: $id) {\n      id\n      name\n      description\n      publicationDate\n      imageSrc\n      paragraphs {\n        ...ParagraphItemFields\n      }\n    }\n  }\n": types.GetArticleDocument,
    "\n  mutation Login($input: AuthInput!) {\n    logIn(input: $input) { accessToken }\n  }\n": types.LoginDocument,
    "mutation Logout { logOut }": types.LogoutDocument,
    "mutation Refresh { refresh { accessToken } }": types.RefreshDocument,
    "\n  query GetArticles {\n    articles {\n      id\n      name\n      description\n      publicationDate\n      imageSrc\n    }\n  }\n": types.GetArticlesDocument,
    "\n  fragment DishItemFields on Dish {\n    id\n    name\n    description\n    price\n    imageSrc\n  }\n": types.DishItemFieldsFragmentDoc,
    "\n  query GetMenu {\n    getMenu {\n      id\n      name\n      dishes {\n        ...DishItemFields\n      }\n    }\n  }\n": types.GetMenuDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ParagraphItemFields on Paragraph {\n    id,\n    name,\n    content,\n    position\n  }\n"): (typeof documents)["\n  fragment ParagraphItemFields on Paragraph {\n    id,\n    name,\n    content,\n    position\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateArticle($input: CreateArticleInput!) {\n    createArticle(createArticleInput: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateArticle($input: CreateArticleInput!) {\n    createArticle(createArticleInput: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteArticle($id: Float!) {\n    deleteArticleById(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteArticle($id: Float!) {\n    deleteArticleById(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteArticles($ids: [Int!]!) {\n    deleteArticles(ids: $ids) {\n      count\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteArticles($ids: [Int!]!) {\n    deleteArticles(ids: $ids) {\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateArticle($input: UpdateArticleInput!) {\n    updateArticle(updateArticleInput: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateArticle($input: UpdateArticleInput!) {\n    updateArticle(updateArticleInput: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetArticle($id: Int!) {\n    article(id: $id) {\n      id\n      name\n      description\n      publicationDate\n      imageSrc\n      paragraphs {\n        ...ParagraphItemFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetArticle($id: Int!) {\n    article(id: $id) {\n      id\n      name\n      description\n      publicationDate\n      imageSrc\n      paragraphs {\n        ...ParagraphItemFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: AuthInput!) {\n    logIn(input: $input) { accessToken }\n  }\n"): (typeof documents)["\n  mutation Login($input: AuthInput!) {\n    logIn(input: $input) { accessToken }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Logout { logOut }"): (typeof documents)["mutation Logout { logOut }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Refresh { refresh { accessToken } }"): (typeof documents)["mutation Refresh { refresh { accessToken } }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetArticles {\n    articles {\n      id\n      name\n      description\n      publicationDate\n      imageSrc\n    }\n  }\n"): (typeof documents)["\n  query GetArticles {\n    articles {\n      id\n      name\n      description\n      publicationDate\n      imageSrc\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DishItemFields on Dish {\n    id\n    name\n    description\n    price\n    imageSrc\n  }\n"): (typeof documents)["\n  fragment DishItemFields on Dish {\n    id\n    name\n    description\n    price\n    imageSrc\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMenu {\n    getMenu {\n      id\n      name\n      dishes {\n        ...DishItemFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMenu {\n    getMenu {\n      id\n      name\n      dishes {\n        ...DishItemFields\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;