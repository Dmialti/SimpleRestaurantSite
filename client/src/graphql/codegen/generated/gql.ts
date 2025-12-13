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
    "\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n": typeof types.GetCategoriesDocument,
    "\n  mutation CreateDish($input: CreateDishInput!) {\n    createDish(createDishInput: $input) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n": typeof types.CreateDishDocument,
    "\n  mutation DeleteDish($id: Int!) {\n    deleteDishById(id: $id) {\n      id\n      name\n    }\n  }\n": typeof types.DeleteDishDocument,
    "\n  mutation DeleteDishes($ids: [Int!]!) {\n    deleteDishes(ids: $ids) {\n      count\n    }\n  }\n": typeof types.DeleteDishesDocument,
    "\n  mutation UpdateDish($input: UpdateDishInput!) {\n    updateDish(updateDishInput: $input) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n": typeof types.UpdateDishDocument,
    "\n  query GetDish($id: Int!) {\n    dish(id: $id) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n": typeof types.GetDishDocument,
    "\n  query GetDishes {\n    dishes {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      category {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetDishesDocument,
    "\n  fragment DishItemFields on Dish {\n    id\n    name\n    description\n    price\n    imageSrc\n  }\n": typeof types.DishItemFieldsFragmentDoc,
    "\n  query GetMenu {\n    getMenu {\n      id\n      name\n      dishes {\n        ...DishItemFields\n      }\n    }\n  }\n": typeof types.GetMenuDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input) {\n      id\n      email\n      role\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation DeleteUser($id: Int!) {\n    deleteUserById(id: $id) {\n      id\n      email\n    }\n  }\n": typeof types.DeleteUserDocument,
    "\n  mutation DeleteUsers($ids: [Int!]!) {\n    deleteUsers(ids: $ids) {\n      count\n    }\n  }\n": typeof types.DeleteUsersDocument,
    "\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(updateUserInput: $input) {\n      id\n      email\n      role\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  query GetUserById($id: Int!) {\n    user(id: $id) {\n      id\n      email\n      role\n    }\n  }\n": typeof types.GetUserByIdDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n    }\n  }\n": typeof types.GetUsersDocument,
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
    "\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  mutation CreateDish($input: CreateDishInput!) {\n    createDish(createDishInput: $input) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n": types.CreateDishDocument,
    "\n  mutation DeleteDish($id: Int!) {\n    deleteDishById(id: $id) {\n      id\n      name\n    }\n  }\n": types.DeleteDishDocument,
    "\n  mutation DeleteDishes($ids: [Int!]!) {\n    deleteDishes(ids: $ids) {\n      count\n    }\n  }\n": types.DeleteDishesDocument,
    "\n  mutation UpdateDish($input: UpdateDishInput!) {\n    updateDish(updateDishInput: $input) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n": types.UpdateDishDocument,
    "\n  query GetDish($id: Int!) {\n    dish(id: $id) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n": types.GetDishDocument,
    "\n  query GetDishes {\n    dishes {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.GetDishesDocument,
    "\n  fragment DishItemFields on Dish {\n    id\n    name\n    description\n    price\n    imageSrc\n  }\n": types.DishItemFieldsFragmentDoc,
    "\n  query GetMenu {\n    getMenu {\n      id\n      name\n      dishes {\n        ...DishItemFields\n      }\n    }\n  }\n": types.GetMenuDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input) {\n      id\n      email\n      role\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation DeleteUser($id: Int!) {\n    deleteUserById(id: $id) {\n      id\n      email\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation DeleteUsers($ids: [Int!]!) {\n    deleteUsers(ids: $ids) {\n      count\n    }\n  }\n": types.DeleteUsersDocument,
    "\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(updateUserInput: $input) {\n      id\n      email\n      role\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query GetUserById($id: Int!) {\n    user(id: $id) {\n      id\n      email\n      role\n    }\n  }\n": types.GetUserByIdDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n    }\n  }\n": types.GetUsersDocument,
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
export function gql(source: "\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateDish($input: CreateDishInput!) {\n    createDish(createDishInput: $input) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDish($input: CreateDishInput!) {\n    createDish(createDishInput: $input) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteDish($id: Int!) {\n    deleteDishById(id: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteDish($id: Int!) {\n    deleteDishById(id: $id) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteDishes($ids: [Int!]!) {\n    deleteDishes(ids: $ids) {\n      count\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteDishes($ids: [Int!]!) {\n    deleteDishes(ids: $ids) {\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateDish($input: UpdateDishInput!) {\n    updateDish(updateDishInput: $input) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDish($input: UpdateDishInput!) {\n    updateDish(updateDishInput: $input) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDish($id: Int!) {\n    dish(id: $id) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  query GetDish($id: Int!) {\n    dish(id: $id) {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      categoryId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDishes {\n    dishes {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDishes {\n    dishes {\n      id\n      name\n      description\n      price\n      imageSrc\n      available\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DishItemFields on Dish {\n    id\n    name\n    description\n    price\n    imageSrc\n  }\n"): (typeof documents)["\n  fragment DishItemFields on Dish {\n    id\n    name\n    description\n    price\n    imageSrc\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMenu {\n    getMenu {\n      id\n      name\n      dishes {\n        ...DishItemFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMenu {\n    getMenu {\n      id\n      name\n      dishes {\n        ...DishItemFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input) {\n      id\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input) {\n      id\n      email\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($id: Int!) {\n    deleteUserById(id: $id) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: Int!) {\n    deleteUserById(id: $id) {\n      id\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUsers($ids: [Int!]!) {\n    deleteUsers(ids: $ids) {\n      count\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUsers($ids: [Int!]!) {\n    deleteUsers(ids: $ids) {\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(updateUserInput: $input) {\n      id\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(updateUserInput: $input) {\n      id\n      email\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserById($id: Int!) {\n    user(id: $id) {\n      id\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($id: Int!) {\n    user(id: $id) {\n      id\n      email\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    users {\n      id\n      email\n      role\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;