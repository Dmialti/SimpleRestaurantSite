import { getAccessToken } from "../utils/services/accessToken.service";
import { authorizedFetch } from "./authorizedFetch";

export const uploadFile = async (
  file: File,
  folder: string = "blog"
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await authorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/upload?folder=${folder}`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  const data = await response.json();
  return data.url;
};
