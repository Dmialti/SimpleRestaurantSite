"use client";

import HeadingDecorated from "@/shared/components/HeadingDecorated/HeadingDecorated";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center gap-6 opacity-60">
      <HeadingDecorated className="text-3xl font-forum text-text-default">
        WELCOME, CHEF
      </HeadingDecorated>
      <p className="font-satoshi text-text-default text-lg max-w-md">
        Select a category from the sidebar to manage your restaurant's content.
      </p>
    </div>
  );
}
