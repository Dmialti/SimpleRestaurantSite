"use client";

import React from "react";
import CardContextProvider from "../../../../context/CardContext/CardContextProvider";
import HeadingDecorated from "../../../../shared/components/HeadingDecorated/HeadingDecorated";
import { formatDate } from "../../../../shared/utils/formatters/formateDate.utils";
import { mergeRefs } from "../../../../shared/utils/helpers/mergeRefs.helper";
import ArticleCard from "../ArticleCard/ArticleCard";
import { GetArticlesQuery } from "../../../../graphql/codegen/generated/graphql";
import { useBasePageLayoutAnimationContext } from "../../../../shared/hooks/useBasePageLayoutAnimationContext";
import { useStaggeredReveal } from "../../../../shared/hooks/useStaggeredReveal.hook";
import styles from "./ArticlesContent.module.css";
import gsap from "gsap";

interface ArticlesContentProps {
  articles: GetArticlesQuery["articles"];
}

const ArticlesContent: React.FC<ArticlesContentProps> = ({ articles }) => {
  const { isContentAnimationDone } = useBasePageLayoutAnimationContext();

  const {
    containerRef: staggeredHeaderContainerRef,
    addToRefs: staggeredHeaderAddToRefs,
  } = useStaggeredReveal({
    stagger: 0,
    y: -50,
    duration: 0.5,
    enable: isContentAnimationDone,
  });

  const {
    containerRef: staggeredArticleContainerRef,
    addToRefs: staggeredArticleAddToRefs,
  } = useStaggeredReveal({
    x: -50,
    duration: 0.5,
    progressThreshold: 0.3,
    triggerByElement: true,
    start: "top 90%",
    toggleActions: "play reverse play reverse",
    end: "bottom 10%",
    ease: gsap.parseEase("sine.inOut"),
    enable: isContentAnimationDone,
    stagger: 0.05,
  });

  return (
    <div
      className="w-full"
      ref={mergeRefs(staggeredHeaderContainerRef, staggeredArticleContainerRef)}
    >
      <HeadingDecorated
        className={`font-forum mb-8 text-text-default text-[40px] leading-[120%] tracking-[1px] ${styles.heading} invisible`}
        ref={staggeredHeaderAddToRefs}
      >
        BEHIND THE SCENE
        <br />& LATEST NEWS
      </HeadingDecorated>
      <div className={`flex flex-col gap-12 ${styles.postsSection}`}>
        {articles.map((item) => (
          <CardContextProvider key={item.id}>
            <ArticleCard
              ref={staggeredArticleAddToRefs}
              id={item.id}
              date={formatDate(item.publicationDate)}
              header={item.name}
              description={item.description}
              cardProps={{
                imageProps: {
                  src: item.imageSrc,
                  alt: `article image ${item.id}`,
                  fill: true,
                },
              }}
              className="invisible"
            />
          </CardContextProvider>
        ))}
      </div>
    </div>
  );
};

export default ArticlesContent;
