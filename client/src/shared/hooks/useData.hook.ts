import { useState, useEffect } from "react";
import { useQuery, type UseQueryArgs, type AnyVariables } from "urql";

export function usePersistentQuery<
  TData = unknown,
  TVariables extends AnyVariables = AnyVariables,
  TResult = unknown
>(
  queryArgs: UseQueryArgs<TVariables, TData>,
  storageKey: string,
  accessor: (data: TData) => TResult,
  defaultValue: TResult
) {
  const [cachedData, setCachedData] = useState<TResult>(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const [{ data: serverResponse, fetching, error }, reexecuteQuery] = useQuery<
    TData,
    TVariables
  >({
    ...queryArgs,
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (serverResponse) {
      const freshData = accessor(serverResponse);
      const serverStr = JSON.stringify(freshData);
      const localStr = JSON.stringify(cachedData);

      if (serverStr !== localStr) {
        console.log(`Updating Cache for: ${storageKey}`);
        setCachedData(freshData);
        localStorage.setItem(storageKey, serverStr);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverResponse, storageKey]);

  const finalData = cachedData;

  const isFirstLoad =
    fetching && JSON.stringify(finalData) === JSON.stringify(defaultValue);

  return {
    data: finalData,
    isFirstLoad,
    error,
    reexecuteQuery,
    fetching,
  };
}
