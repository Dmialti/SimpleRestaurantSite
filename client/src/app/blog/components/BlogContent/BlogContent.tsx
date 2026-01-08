"use client";

import { GET_ARTICLES_QUERY } from "@/graphql/blog/queries/getArticles.query";
import {
  GetArticlesQuery,
  GetArticlesQueryVariables,
} from "@/graphql/codegen/generated/graphql";
import BasePageLayout from "@/shared/components/BasePageLayout/BasePageLayout";
import { useQueryReexecute } from "@/shared/hooks/useQueryReexecute";
import blogHero from "@/assets/BlogPageMaterials/blogHero.webp";
import ArticlesContent from "../ArticlesContent/ArticlesContent";
import styles from "./BlogContent.module.css";
import { useRecalculateLayout } from "@/shared/hooks/useRecalculateLayout";
import ErrorFallback from "@/shared/components/ErrorFallback/ErrorFallback";

interface BlogContentProps {
  initialArticles: GetArticlesQuery["articles"];
  initialError: string | null;
}

export default function BlogContent({
  initialArticles,
  initialError,
}: BlogContentProps) {
  const { data, error, isLoading, retry } = useQueryReexecute<
    GetArticlesQuery,
    GetArticlesQueryVariables
  >({
    initialData: { articles: initialArticles },
    initialError,
    query: GET_ARTICLES_QUERY,
    variables: {},
  });

  const articles = data?.articles;
  const hasError = !!error;
  const hasArticles = articles && articles.length > 0;

  useRecalculateLayout(!isLoading && !!hasArticles);

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
      {hasError && !hasArticles ? (
        <ErrorFallback error={error} isLoading={isLoading} retry={retry} />
      ) : (
        <div
          className={`w-full ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <ArticlesContent articles={articles} />
        </div>
      )}
    </BasePageLayout>
  );
}
