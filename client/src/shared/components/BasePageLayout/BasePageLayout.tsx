"use client";

import { useState, type ReactNode } from "react";
import styles from "./BasePageLayout.module.css";
import HeroCard, { type HeroCardProps } from "../HeroCard/HeroCard";
import { useStaggeredReveal } from "../../hooks/useStaggeredReveal.hook";
import { mergeRefs } from "../../utils/helpers/mergeRefs.helper";
import { BasePageLayoutAnimationContext } from "../../../context/BasePageLayoutAnimationContext/BasePageLayoutAnimationContext";

type BasePageLayoutProps = {
  isScreenHeight: boolean;
  enableHeroAnimation?: boolean;
  enableContentAnimation?: boolean;
  heroCardProps: HeroCardProps;
  className?: string;
  children?: ReactNode;
};

export default function BasePageLayout({
  isScreenHeight,
  enableHeroAnimation = true,
  enableContentAnimation = true,
  heroCardProps,
  children,
  className,
}: BasePageLayoutProps) {
  const [isHeroAnimationDone, setIsHeroAnimationDone] = useState(false);
  const [isContentAnimationDone, setIsContentAnimationDone] = useState(false);

  const finalHeroProps: HeroCardProps =
    heroCardProps.mediaType === "image"
      ? {
          ...heroCardProps,
          mediaType: "image",
          imageProps: {
            ...heroCardProps.imageProps,
            src: heroCardProps.imageProps?.src || "",
            alt: heroCardProps.imageProps?.alt || "Hero image",
            fill: true,
            loading: "eager",
            preload: true,
            sizes: "(max-width: 1280px) 100vw, 100vh",
          },
        }
      : heroCardProps;

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
        className={`${
          styles.mainSection
        } w-full h-auto box-border gap-4 relative px-6 ${
          isScreenHeight && "overflow-hidden"
        }`}
      >
        <div
          ref={staggeredHeroAddToRefs}
          className={`${styles.heroSection} top-0 py-6 h-screen sticky invisible`}
        >
          <HeroCard
            {...finalHeroProps}
            enableHeadingAnimation={isHeroAnimationDone}
            className={`relative h-full`}
          />
        </div>
        <div
          ref={staggeredContentAddToRefs}
          className={`${
            styles.contentSection + " " + (isScreenHeight && "h-screen")
          } min-w-0 py-6`}
        >
          <div
            className={`border border-border-default h-full rounded-2xl ${className}`}
          >
            {children}
          </div>
        </div>
      </div>
    </BasePageLayoutAnimationContext.Provider>
  );
}
