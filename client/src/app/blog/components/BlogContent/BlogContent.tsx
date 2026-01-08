"use client";

import { GetArticlesQuery } from "@/graphql/codegen/generated/graphql";
import BasePageLayout from "@/shared/components/BasePageLayout/BasePageLayout";
import Button from "@/shared/components/Button/Button";
import HeadingDecorated from "@/shared/components/HeadingDecorated/HeadingDecorated";
import ArticlesContent from "../ArticlesContent/ArticlesContent";
import styles from "./BlogContent.module.css";

import blogHero from "@/assets/BlogPageMaterials/blogHero.webp";

interface BlogContentProps {
  initialArticles: GetArticlesQuery["articles"];
  initialError: string;
}

export default function BlogContent({
  initialArticles,
  initialError,
}: BlogContentProps) {
  return (
    <BasePageLayout
      className={`py-20 px-24 flex flex-col gap-20 items-center ${styles.mainSection}`}
      heroCardProps={{
        heading: ["BLOG"],
        mediaType: "image",
        imageProps: { src: blogHero, alt: "blog hero image" },
      }}
      isScreenHeight={false}
    >
      {initialError && (!initialArticles || initialArticles.length === 0) ? (
        <div className="flex flex-col items-center justify-center gap-6 py-20 h-full text-center">
          <HeadingDecorated
            className={`text-red-500 font-forum text-2xl tracking-widest ${styles.heading}`}
          >
            OOPS! SOMETHING WENT WRONG
          </HeadingDecorated>

          <p className="text-text-muted font-satoshi text-lg max-w-md">
            {initialError}
          </p>

          <Button
            variant="border"
            className="px-6 py-2 uppercase tracking-widest text-sm text-text-default"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <ArticlesContent articles={initialArticles} />
      )}
    </BasePageLayout>
  );
}
