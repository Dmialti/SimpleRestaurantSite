import React, { useState, type ReactNode } from "react";
import styles from "./BasePageLayout.module.css";
import HeroCard, { type HeroCardProps } from "../HeroCard/HeroCard";
import { useStaggeredReveal } from "../../hooks/useStaggeredReveal.hook";
import { mergeRefs } from "../../utils/helpers/mergeRefs.helper";
import { BasePageLayoutAnimationContext } from "../../../context/BasePageLayoutAnimationContext/BasePageLayoutAnimationContext";

interface BasePageLayoutProps extends HeroCardProps {
  isScreenHeight: boolean;
  enableHeroAnimation?: boolean;
  enableContentAnimation?: boolean;
  className?: string;
  children?: ReactNode;
}

const BasePageLayout: React.FC<BasePageLayoutProps> = ({
  heading,
  mediaType,
  mediaSrc,
  isScreenHeight,
  enableHeroAnimation = true,
  enableContentAnimation = true,
  children,
  className,
}) => {
  const [isHeroAnimationDone, setIsHeroAnimationDone] = useState(false);
  const [isContentAnimationDone, setIsContentAnimationDone] = useState(false);

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
    responsive: {
      "(max-width: 1280px)": {
        y: -50,
        x: 0,
      },
    },
    enable: enableHeroAnimation,
  });

  const {
    containerRef: staggeredContentContainerRef,
    addToRefs: staggeredContentAddToRefs,
  } = useStaggeredReveal({
    y: -50,
    duration: 1,
    responsive: {
      "(max-width: 1280px)": {
        y: 0,
        x: 50,
      },
    },
    onComplete: () => {
      setIsContentAnimationDone(true);
    },
    enable: enableContentAnimation,
  });

  return (
    <BasePageLayoutAnimationContext.Provider
      value={{ isHeroAnimationDone, isContentAnimationDone }}
    >
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
          } min-w-0 py-6`}
        >
          <div
            className={`${className} border border-border-default h-full rounded-2xl`}
          >
            {children}
          </div>
        </div>
      </div>
    </BasePageLayoutAnimationContext.Provider>
  );
};

export default BasePageLayout;
