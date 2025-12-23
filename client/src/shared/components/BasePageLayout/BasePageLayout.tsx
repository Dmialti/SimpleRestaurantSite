import React, { useState, type ReactNode } from "react";
import styles from "./BasePageLayout.module.css";
import HeroCard, { type HeroCardProps } from "../HeroCard/HeroCard";
import { useStaggeredReveal } from "../../hooks/useStaggeredReveal.hook";
import { mergeRefs } from "../../utils/helpers/mergeRefs.helper";

interface BasePageLayoutProps extends HeroCardProps {
  isScreenHeight: boolean;
  className?: string;
  children?: ReactNode;
}

const BasePageLayout: React.FC<BasePageLayoutProps> = ({
  heading,
  mediaType,
  mediaSrc,
  isScreenHeight,
  children,
  className,
}) => {
  const [isHeroAnimationDone, setIsHeroAnimationDone] = useState(false);

  const {
    containerRef: staggeredHeroContainerRef,
    addToRefs: staggeredHeroAddToRefs,
  } = useStaggeredReveal({
    x: -50,
    duration: 1,
    onProgress: () => {
      setIsHeroAnimationDone(true);
    },
    progressThreshold: 0.4,
  });

  const {
    containerRef: staggeredContentContainerRef,
    addToRefs: staggeredContentAddToRefs,
  } = useStaggeredReveal({
    y: -50,
    duration: 1,
  });

  return (
    <div
      ref={mergeRefs(staggeredHeroContainerRef, staggeredContentContainerRef)}
      className={`${styles.mainSection} w-full h-auto box-border gap-4 relative px-6`}
    >
      <div
        ref={staggeredHeroAddToRefs}
        className={`${styles.heroSection} top-0 py-6 h-screen sticky`}
      >
        <HeroCard
          enableHeadingAnimation={isHeroAnimationDone}
          heading={heading}
          className={`relative h-full`}
          mediaType={mediaType}
          mediaSrc={mediaSrc}
        />
      </div>
      <div
        ref={staggeredContentAddToRefs}
        className={`${
          styles.contentSection + " " + (isScreenHeight && "h-screen")
        } overflow-hidden min-w-0 py-6`}
      >
        <div
          className={`${className} border border-border-default h-full rounded-2xl`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BasePageLayout;
