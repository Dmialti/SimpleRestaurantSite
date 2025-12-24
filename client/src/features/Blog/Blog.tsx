import React from "react";
import { GET_ARTICLES_QUERY } from "../../graphql/blog/queries/getArticles.query";
import type { GetArticlesQuery } from "../../graphql/codegen/generated/graphql";
import blogHeroImg from "../../assets/BlogPageMaterials/blogHero.png";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import Button from "../../shared/components/Button/Button";
import HeadingDecorated from "../../shared/components/HeadingDecorated/HeadingDecorated";
import LoadingSpinner from "../../shared/components/LoadingSpinner/LoadingSpinner";
import { STORAGE_KEYS } from "../../shared/constants/storage.constants";
import { usePersistentQuery } from "../../shared/hooks/usePersistentQuery.hook";
import styles from "./Blog.module.css";
import BlogContent from "./components/BlogContent/BlogContent";

const Blog: React.FC = () => {
  const {
    data: articles,
    isFirstLoad,
    error,
    reexecuteQuery,
  } = usePersistentQuery<
    GetArticlesQuery,
    object,
    GetArticlesQuery["articles"]
  >(
    { query: GET_ARTICLES_QUERY },
    STORAGE_KEYS.ARTICLES_DATA,
    (data) => data.articles,
    []
  );

  return (
    <BasePageLayout
      className={`py-20 px-24 flex flex-col gap-20 items-center ${styles.mainSection}`}
      heading={["BLOG"]}
      mediaType="image"
      mediaSrc={blogHeroImg}
      isScreenHeight={false}
    >
      {isFirstLoad ? (
        <LoadingSpinner />
      ) : error && (!articles || articles.length === 0) ? (
        <div className="flex flex-col items-center justify-center gap-6 py-20 h-full text-center">
          <HeadingDecorated
            className={`text-red-500 font-forum text-2xl tracking-widest ${styles.heading}`}
          >
            OOPS! SOMETHING WENT WRONG
          </HeadingDecorated>

          <p className="text-text-muted font-satoshi text-lg max-w-md">
            {error.message}
          </p>

          <Button
            variant="border"
            className="px-6 py-2 uppercase tracking-widest text-sm text-text-default"
            onClick={() => reexecuteQuery({ requestPolicy: "network-only" })}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <BlogContent articles={articles} />
      )}
    </BasePageLayout>
  );
};

export default Blog;
