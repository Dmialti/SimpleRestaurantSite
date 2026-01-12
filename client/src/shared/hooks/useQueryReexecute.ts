"use client";

import { useState, useTransition } from "react";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { reexecuteQueryGraphQL } from "../api/reexecuteQuery-graphql";

interface UseQueryReexecuteOptions<T, V> {
  initialData: T;
  initialError?: string | null;
  query: TypedDocumentNode<T, V> | string;
  variables?: V;
}

export function useQueryReexecute<T, V>({
  initialData,
  initialError = null,
  query,
  variables = {} as V,
}: UseQueryReexecuteOptions<T, V>) {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<string | null>(initialError);
  const [isPending, startTransition] = useTransition();

  const retry = () => {
    startTransition(async () => {
      setError(null);

      const response = await reexecuteQueryGraphQL<T, V>(query, variables);

      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.error || "Failed to fetch data");
      }
    });
  };

  return {
    data,
    error,
    isLoading: isPending,
    retry,
  };
}
