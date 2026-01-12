const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        query: `mutation Refresh { refresh { accessToken } }`,
      }),
    });

    const result = await response.json();

    if (result.errors || !response.ok) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};
