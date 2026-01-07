"use client";

import React, { useState } from "react";
import styles from "./HomeContent.module.css";
import HeroCard from "@/shared/components/HeroCard/HeroCard";
import { useStaggeredReveal } from "@/shared/hooks/useStaggeredReveal.hook";
import CornerMenu from "../CornerMenu/CornerMenu";
import LinkIcon from "../LinkIcon/LinkIcon";
import { NavCard } from "../NavCard/NavCard";

import sideImage1 from "@/assets/StartingPageMaterials/images/side-1.webp";
import sideImage2 from "@/assets/StartingPageMaterials/images/side-2.webp";
import sideImage3 from "@/assets/StartingPageMaterials/images/side-3.webp";

export default function HomeContent() {
  const [isHeroAnimationDone, setIsHeroAnimationDone] = useState(false);

  const { containerRef: leftRef, addToRefs: addToLeftRefs } =
    useStaggeredReveal({
      stagger: 0.2,
      y: -50,
      duration: 1,
      onProgress: () => setIsHeroAnimationDone(true),
      progressThreshold: 0.3,
    });

  const { containerRef: rightRef, addToRefs: addToRightRefs } =
    useStaggeredReveal({
      stagger: 0.2,
      x: 50,
      duration: 1,
      triggerByElement: true,
      start: "top 95%",
      toggleActions: "play reverse play reverse",
      end: "bottom 5%",
    });

  return (
    <div
      ref={leftRef}
      className={`${styles.mainSection} font-forum w-full h-dvh max-h-dvh box-border bg-background-default p-6 flex flex-col lg:flex-row gap-4 overflow-hidden`}
    >
      <div
        className={`flex-2 h-full min-h-0 min-w-0 relative ${styles.heroSectionWrapper}`}
      >
        <HeroCard
          ref={addToLeftRefs}
          className={`${styles.heroSection} w-full h-full flex relative rounded-2xl`}
          heading={["SUSHI", "SENSATION"]}
          enableHeadingAnimation={isHeroAnimationDone}
          mediaType="video"
          mediaSrc="/StartingPageMaterials/videos/main.mp4"
        >
          <CornerMenu
            className={`${styles.heroCornerMenu} pr-4 pb-4 pt-6 pl-6 gap-2`}
          >
            <LinkIcon
              className="block p-2.5"
              src="/shared/icons/instagramLogo.svg"
              href="https://github.com/Dmialti"
              alt="instagram link logo"
            />
            <LinkIcon
              className="block p-2.5"
              src="/shared/icons/facebookLogo.svg"
              href="https://github.com/Dmialti"
              alt="facebook link logo"
            />
            <LinkIcon
              className="block p-2.5"
              src="/shared/icons/xLogo.svg"
              href="https://github.com/Dmialti"
              alt="x link logo"
            />
          </CornerMenu>
        </HeroCard>
      </div>

      <div
        ref={rightRef}
        className={`flex-1 flex flex-col gap-4 h-full min-h-0 min-w-0 ${styles.cardsSection} `}
      >
        <NavCard
          title="MENU"
          link="/menu"
          addRef={addToRightRefs}
          cardWithContextHoverProps={{
            mediaType: "image",
            imageProps: {
              src: sideImage1,
              alt: "menu",
              preload: true,
              loading: "eager",
              fill: false,
              className: styles.responsiveImage,
              sizes: "(max-width: 810px) 100vw,(max-width: 1280px) 100vh, 33vw",
              quality: 100,
            },
          }}
        />
        <NavCard
          title="RESERVATION"
          link="/reservation"
          addRef={addToRightRefs}
          cardWithContextHoverProps={{
            mediaType: "image",
            imageProps: {
              src: sideImage2,
              alt: "reservation",
              preload: true,
              loading: "eager",
              fill: false,
              className: styles.responsiveImage,
              sizes: "(max-width: 810px) 100vw,(max-width: 1280px) 100vh, 33vw",
              quality: 100,
            },
          }}
        />
        <NavCard
          title="OUR RESTAURANT"
          link="/about"
          addRef={addToRightRefs}
          cardWithContextHoverProps={{
            mediaType: "image",
            imageProps: {
              src: sideImage3,
              alt: "about",
              preload: true,
              loading: "eager",
              fill: false,
              className: styles.responsiveImage,
              sizes: "(max-width: 810px) 100vw,(max-width: 1280px) 100vh, 33vw",
              quality: 100,
            },
          }}
        />
      </div>
    </div>
  );
}
