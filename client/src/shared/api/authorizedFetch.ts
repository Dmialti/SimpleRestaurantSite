import { refreshAccessToken } from "./auth-graphql";

export const authorizedFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  let response = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshSuccess = await refreshAccessToken();

  if (!refreshSuccess) {
    window.location.href = "/admin/login";
    throw new Error("Session expired");
  }

  response = await fetch(input, {
    ...init,
    credentials: "include",
  });

  return response;
};
