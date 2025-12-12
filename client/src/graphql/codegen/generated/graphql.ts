/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageSrc: Scalars['String']['output'];
  name: Scalars['String']['output'];
  paragraphs?: Maybe<Array<Paragraph>>;
  publicationDate: Scalars['DateTime']['output'];
};

export type ArticlePayload = {
  __typename?: 'ArticlePayload';
  count: Scalars['Int']['output'];
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  dishes: Array<Dish>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CreateArticleInput = {
  description: Scalars['String']['input'];
  imageSrc: Scalars['String']['input'];
  name: Scalars['String']['input'];
  paragraphs: Array<CreateParagraphInput>;
  publicationDate: Scalars['DateTime']['input'];
};

export type CreateCategoryInput = {
  dishes: Array<CreateDishInput>;
  name: Scalars['String']['input'];
};

export type CreateDishInput = {
  available: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  imageSrc: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type CreateParagraphInput = {
  content: Scalars['String']['input'];
  name: Scalars['String']['input'];
  position: Scalars['Int']['input'];
};

export type Dish = {
  __typename?: 'Dish';
  available: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageSrc: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type DishPayload = {
  __typename?: 'DishPayload';
  count: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: Article;
  createCategory: Category;
  createDish: Dish;
  deleteArticleById: Article;
  deleteArticles: ArticlePayload;
  deleteDishById: Dish;
  deleteDishes: DishPayload;
  logIn: AuthResponse;
  logOut: Scalars['Boolean']['output'];
  refresh: AuthResponse;
  signUp: AuthResponse;
  updateArticle: Article;
  updateDish: Dish;
  updateDishAvailability: Dish;
  updateReservationStatus: Reservation;
};


export type MutationCreateArticleArgs = {
  createArticleInput: CreateArticleInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateDishArgs = {
  categoryId: Scalars['Float']['input'];
  createDishInput: CreateDishInput;
};


export type MutationDeleteArticleByIdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteArticlesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteDishByIdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteDishesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationLogInArgs = {
  input: AuthInput;
};


export type MutationSignUpArgs = {
  input: AuthInput;
};


export type MutationUpdateArticleArgs = {
  updateArticleInput: UpdateArticleInput;
};


export type MutationUpdateDishArgs = {
  updateDishInput: UpdateDishInput;
};


export type MutationUpdateDishAvailabilityArgs = {
  available: Scalars['Boolean']['input'];
  dishId: Scalars['Float']['input'];
};

export type Paragraph = {
  __typename?: 'Paragraph';
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  article: Article;
  articles: Array<Article>;
  dishes: Array<Dish>;
  getMenu: Array<Category>;
  reservations: Array<Reservation>;
};


export type QueryArticleArgs = {
  id: Scalars['Int']['input'];
};

export type Reservation = {
  __typename?: 'Reservation';
  createdAt: Scalars['DateTime']['output'];
  dateAndTime: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  status: ReservationStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ReservationStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type UpdateArticleInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  imageSrc: Scalars['String']['input'];
  name: Scalars['String']['input'];
  paragraphs: Array<CreateParagraphInput>;
  publicationDate: Scalars['DateTime']['input'];
};

export type UpdateDishInput = {
  available: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  imageSrc: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type ParagraphItemFieldsFragment = { __typename?: 'Paragraph', id: number, name: string, content: string, position: number } & { ' $fragmentName'?: 'ParagraphItemFieldsFragment' };

export type CreateArticleMutationVariables = Exact<{
  input: CreateArticleInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', id: number } };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticleById: { __typename?: 'Article', id: number } };

export type DeleteArticlesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteArticlesMutation = { __typename?: 'Mutation', deleteArticles: { __typename?: 'ArticlePayload', count: number } };

export type UpdateArticleMutationVariables = Exact<{
  input: UpdateArticleInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'Article', id: number } };

export type GetArticleQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: number, name: string, description: string, publicationDate: any, imageSrc: string, paragraphs?: Array<(
      { __typename?: 'Paragraph' }
      & { ' $fragmentRefs'?: { 'ParagraphItemFieldsFragment': ParagraphItemFieldsFragment } }
    )> | null } };

export type LoginMutationVariables = Exact<{
  input: AuthInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', logIn: { __typename?: 'AuthResponse', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logOut: boolean };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename?: 'AuthResponse', accessToken: string } };

export type GetArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', id: number, name: string, description: string, publicationDate: any, imageSrc: string }> };

export type DishItemFieldsFragment = { __typename?: 'Dish', id: number, name: string, description: string, price: number, imageSrc: string } & { ' $fragmentName'?: 'DishItemFieldsFragment' };

export type GetMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenuQuery = { __typename?: 'Query', getMenu: Array<{ __typename?: 'Category', id: number, name: string, dishes: Array<(
      { __typename?: 'Dish' }
      & { ' $fragmentRefs'?: { 'DishItemFieldsFragment': DishItemFieldsFragment } }
    )> }> };

export const ParagraphItemFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ParagraphItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Paragraph"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]} as unknown as DocumentNode<ParagraphItemFieldsFragment, unknown>;
export const DishItemFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DishItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Dish"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}}]}}]} as unknown as DocumentNode<DishItemFieldsFragment, unknown>;
export const CreateArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateArticle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateArticleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createArticleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateArticleMutation, CreateArticleMutationVariables>;
export const DeleteArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteArticle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteArticleById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const DeleteArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteArticles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteArticles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<DeleteArticlesMutation, DeleteArticlesMutationVariables>;
export const UpdateArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateArticle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateArticleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateArticleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const GetArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArticle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"article"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"publicationDate"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}},{"kind":"Field","name":{"kind":"Name","value":"paragraphs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ParagraphItemFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ParagraphItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Paragraph"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]} as unknown as DocumentNode<GetArticleQuery, GetArticleQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logOut"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const GetArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"publicationDate"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}}]}}]}}]} as unknown as DocumentNode<GetArticlesQuery, GetArticlesQueryVariables>;
export const GetMenuDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMenu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMenu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dishes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DishItemFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DishItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Dish"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}}]}}]} as unknown as DocumentNode<GetMenuQuery, GetMenuQueryVariables>;