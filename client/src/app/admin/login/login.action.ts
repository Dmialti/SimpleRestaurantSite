"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOGIN_MUTATION } from "@/graphql/auth/mutations/logIn.mutation";
import { print } from "graphql";

interface ActionState {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: print(LOGIN_MUTATION),
          variables: { input: { email, password } },
        }),
        cache: "no-store",
      }
    );

    const json = await response.json();

    if (json.errors) {
      return { error: json.errors[0].message };
    }

    const { accessToken, refreshToken } = json.data?.logIn || {};

    if (!accessToken || !refreshToken) {
      return { error: "Failed to retrieve tokens" };
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/admin/menu");
}
