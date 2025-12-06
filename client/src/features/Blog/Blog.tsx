import React from "react";
import BasePageLayout from "../shared/components/BasePageLayout/BasePageLayout";
import ArticleCard from "./components/ArticleCard/ArticleCard";
import CardContextProvider from "../shared/context/CardContext/CardContextProvider";
import HeadingDecorated from "../shared/components/HeadingDecorated/HeadingDecorated";
import { GET_ARTICLES_QUERY } from "../../graphql/blog/queries/getArticles.query";
import { useQuery } from "urql";
import { formatDate } from "../shared/utils/formateDate.utils";
import LoadingSpinner from "../shared/components/LoadingSpinner/LoadingSpinner";
import Button from "../shared/components/Button/Button";

const Blog: React.FC = () => {
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: GET_ARTICLES_QUERY,
    requestPolicy: "cache-and-network",
  });

  const articles = data?.articles || [];

  return (
    <BasePageLayout
      className="py-20 px-24 flex flex-col gap-20 items-center"
      heading={["BLOG"]}
      mediaType="image"
      mediaSrc="/BlogPageMaterials/blogHero.png"
      isScreenHeight={false}
    >
      {fetching ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="flex flex-col items-center justify-center gap-6 py-20 h-full text-center">
          <HeadingDecorated className="text-red-500 font-forum text-2xl tracking-widest">
            OOPS! SOMETHING WENT WRONG
          </HeadingDecorated>

          <p className="text-text-muted font-satoshi text-lg max-w-md">
            {error.message}
          </p>

          <Button
            type="border"
            className="px-6 py-2 uppercase tracking-widest text-sm text-text-default"
            onClick={() => reexecuteQuery({ requestPolicy: "network-only" })}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <HeadingDecorated className="font-forum text-text-default text-[40px] leading-[120%] tracking-[1px]">
            BEHIND THE SCENE
            <br />& LATEST NEWS
          </HeadingDecorated>
          <div className="flex flex-col gap-12">
            {articles.map((item) => (
              <CardContextProvider key={item.id}>
                <ArticleCard
                  id={item.id}
                  date={formatDate(item.publicationDate)}
                  header={item.name}
                  description={item.description}
                  imageSrc={item.imageSrc}
                />
              </CardContextProvider>
            ))}
          </div>
        </>
      )}
    </BasePageLayout>
  );
};

export default Blog;
