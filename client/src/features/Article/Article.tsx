import React from "react";
import Paragraph from "./components/Paragraph";
import { useParams } from "react-router-dom";
import { GET_ARTICLE_QUERY } from "../../graphql/article/queries/getArticle.query";
import { useFragment } from "../../graphql/codegen/generated";
import { PARAGRAPH_FRAGMENT } from "../../graphql/article/fragments/paragraph.fragment";
import type {
  GetArticleQuery,
  GetArticleQueryVariables,
} from "../../graphql/codegen/generated/graphql";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import Button from "../../shared/components/Button/Button";
import HeadingDecorated from "../../shared/components/HeadingDecorated/HeadingDecorated";
import LoadingSpinner from "../../shared/components/LoadingSpinner/LoadingSpinner";
import { STORAGE_KEYS } from "../../shared/constants/storage.constants";
import { usePersistentQuery } from "../../shared/hooks/usePersistentQuery.hook";
import { formatDate } from "../../shared/utils/formatters/formateDate.utils";

const Article: React.FC = () => {
  const { id } = useParams();
  const numericId = Number(id);

  const {
    data: article,
    error,
    isFirstLoad,
    reexecuteQuery,
  } = usePersistentQuery<
    GetArticleQuery,
    GetArticleQueryVariables,
    GetArticleQuery["article"] | null
  >(
    {
      query: GET_ARTICLE_QUERY,
      variables: { id: numericId },
      pause: !numericId,
    },
    STORAGE_KEYS.ARTICLE_PREFIX + id,
    (data) => data.article,
    null
  );

  const paragraphs = useFragment(PARAGRAPH_FRAGMENT, article?.paragraphs);

  if (isFirstLoad) {
    return <LoadingSpinner className="h-screen" />;
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20 h-screen text-center">
        <HeadingDecorated className="text-red-500 font-forum text-2xl tracking-widest">
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
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen text-text-default font-forum text-2xl">
        Article not found
      </div>
    );
  }

  return (
    <BasePageLayout
      className="py-20 px-24 flex flex-col gap-20 items-center"
      mediaType="image"
      mediaSrc={article?.imageSrc}
      isScreenHeight={false}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <HeadingDecorated className="font-satoshi text-text-default text-[12px] leading-[190%] tracking-[1px]">
          {formatDate(article.publicationDate)}
        </HeadingDecorated>
        <div className="uppercase font-forum text-text-default text-[64px] leading-[110%] tracking-[1px]">
          {article.name}
        </div>
        <img src="/ArticlePageMaterials/decor.png" />
      </div>
      <div className="w-full h-full flex flex-col gap-12">
        {paragraphs
          ?.sort((a, b) => a.position - b.position)
          .map((item) => (
            <Paragraph key={item.id} header={item.name}>
              {item.content}
            </Paragraph>
          ))}
      </div>
    </BasePageLayout>
  );
};

export default Article;
