"use server";

import { revalidateTag } from "next/cache";

export async function revalidateBlogAction() {
  revalidateTag("blog-data", { expire: 0 });
}
