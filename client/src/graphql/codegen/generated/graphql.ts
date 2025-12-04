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
  id: Scalars['Int']['output'];
  imageSrc: Scalars['String']['output'];
  name: Scalars['String']['output'];
  paragraphs?: Maybe<Array<Paragraph>>;
  publicationDate: Scalars['DateTime']['output'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: Article;
  createCategory: Category;
  createDish: Dish;
  logIn: AuthResponse;
  logout: Scalars['Boolean']['output'];
  refresh: AuthResponse;
  signUp: AuthResponse;
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


export type MutationLogInArgs = {
  input: AuthInput;
};


export type MutationSignUpArgs = {
  input: AuthInput;
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
  articles: Array<Article>;
  dishes: Array<Dish>;
  getMenu: Array<Category>;
  reservations: Array<Reservation>;
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

export type DishItemFieldsFragment = { __typename?: 'Dish', id: number, name: string, description: string, price: number, imageSrc: string } & { ' $fragmentName'?: 'DishItemFieldsFragment' };

export type GetMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenuQuery = { __typename?: 'Query', getMenu: Array<{ __typename?: 'Category', id: number, name: string, dishes: Array<(
      { __typename?: 'Dish' }
      & { ' $fragmentRefs'?: { 'DishItemFieldsFragment': DishItemFieldsFragment } }
    )> }> };

export const DishItemFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DishItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Dish"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}}]}}]} as unknown as DocumentNode<DishItemFieldsFragment, unknown>;
export const GetMenuDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMenu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMenu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dishes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DishItemFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DishItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Dish"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}}]}}]} as unknown as DocumentNode<GetMenuQuery, GetMenuQueryVariables>;