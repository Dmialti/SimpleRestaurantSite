"use server";

import { fetchGraphQL } from "@/shared/api/fetch-graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export async function reexecuteQueryGraphQL<TResult, TVariables>(
  query: TypedDocumentNode<TResult, TVariables> | string,
  variables: TVariables = {} as TVariables
) {
  try {
    const data = await fetchGraphQL<TResult>(query, variables, [], "no-store");

    return { success: true, data };
  } catch (error: any) {
    console.error("Re-execute error:", error);
    return { success: false, error: error.message };
  }
}
