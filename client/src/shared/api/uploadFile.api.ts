import { getAccessToken } from "../utils/services/accessToken.service";

export const uploadFile = async (
  file: File,
  folder: string = "blog"
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const token = getAccessToken();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/upload?folder=${folder}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.url;
};
