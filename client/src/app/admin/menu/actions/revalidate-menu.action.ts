"use server";

import { revalidateTag } from "next/cache";

export async function revalidateMenuAction() {
  revalidateTag("menu-data", { expire: 0 });
}
