"use client";

import { PARAGRAPH_FRAGMENT } from "@/graphql/article/fragments/paragraph.fragment";
import { useFragment } from "@/graphql/codegen/generated";
import { GetArticleQuery } from "@/graphql/codegen/generated/graphql";
import BasePageLayout from "@/shared/components/BasePageLayout/BasePageLayout";
import HeadingDecorated from "@/shared/components/HeadingDecorated/HeadingDecorated";
import { formatDate } from "@/shared/utils/formatters/formateDate.utils";
import Paragraph from "../Paragraph/Paragraph";

import styles from "./ArticleContent.module.css";

interface ArticleContentProps {
  article?: GetArticleQuery["article"] | null;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const paragraphs = useFragment(PARAGRAPH_FRAGMENT, article?.paragraphs);

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen text-text-default font-forum text-2xl">
        Article not found
      </div>
    );
  }

  return (
    <BasePageLayout
      className={`py-20 px-24 flex flex-col gap-20 items-center ${styles.mainSection}`}
      heroCardProps={{
        mediaType: "image",
        imageProps: {
          src: article.imageSrc,
          alt: `article ${article.id} hero image`,
        },
      }}
      isScreenHeight={false}
    >
      <div className="flex flex-col items-center text-center gap-4 wrap-normal">
        <HeadingDecorated
          className={`font-satoshi text-text-default text-[12px] leading-[190%] tracking-[1px] wrap-anywhere`}
        >
          {formatDate(article.publicationDate)}
        </HeadingDecorated>
        <div
          className={`uppercase font-forum text-text-default text-[64px] leading-[110%] tracking-[1px] ${styles.heading}`}
        >
          {article.name}
        </div>
        <img
          alt="underheading decor icon"
          src="/ArticlePageMaterials/decor.png"
        />
      </div>
      <div className="w-full h-full flex flex-col gap-12 wrap-anywhere">
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
}
