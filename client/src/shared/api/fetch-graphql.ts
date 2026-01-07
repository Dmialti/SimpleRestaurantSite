import { print } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export async function fetchGraphQL<TData = any, TVariables = any>(
  query: string | TypedDocumentNode<TData, TVariables>,
  variables?: TVariables,
  tags: string[] = []
) {
  const queryString = typeof query === "string" ? query : print(query);
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryString,
      variables,
    }),

    next: {
      tags: tags,
    },
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data as TData;
}
