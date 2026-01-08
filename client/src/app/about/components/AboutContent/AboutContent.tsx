"use client";

import BasePageLayout from "@/shared/components/BasePageLayout/BasePageLayout";
import HeadingDecorated from "@/shared/components/HeadingDecorated/HeadingDecorated";
import ImageSlider from "@/shared/components/ImageSlider/ImageSlider";
import { useStaggeredReveal } from "@/shared/hooks/useStaggeredReveal.hook";
import { mergeRefs } from "@/shared/utils/helpers/mergeRefs.helper";
import TileWithStars from "../TileWithStars/TileWithStars";
import styles from "./AboutContent.module.css";
import { topSlider, bottomSlider } from "./static/imageSliderSrcs";

import aboutHero from "@/assets/AboutPageMaterials/aboutHero.webp";

export default function AboutContent() {
  const {
    containerRef: staggeredLeftContainerRef,
    addToRefs: staggeredLeftAddToRefs,
  } = useStaggeredReveal({
    stagger: 0,
    x: -50,
    duration: 1,
    triggerByElement: true,
  });

  const {
    containerRef: staggeredRightContainerRef,
    addToRefs: staggeredRightAddToRefs,
  } = useStaggeredReveal({
    stagger: 0,
    x: 50,
    duration: 1,
    triggerByElement: true,
  });

  const {
    containerRef: staggeredMiddleContainerRef,
    addToRefs: staggeredMiddleAddToRefs,
  } = useStaggeredReveal({
    stagger: 0.3,
    duration: 1,
    triggerByElement: true,
  });

  return (
    <>
      <BasePageLayout
        isScreenHeight={true}
        heroCardProps={{
          heading: ["ABOUT"],
          mediaType: "image",
          imageProps: {
            src: aboutHero,
            alt: "about hero image",
          },
        }}
        className="border-none"
        enableContentAnimation={false}
      >
        <div
          ref={mergeRefs(staggeredLeftContainerRef, staggeredRightContainerRef)}
          className={`h-full flex flex-col wrap-anywhere gap-4 text-text-default ${styles.mainContainer}`}
        >
          <div
            className={`h-full min-h-0 flex flex-row gap-4 ${styles.topLine}`}
          >
            <div
              ref={staggeredLeftAddToRefs}
              className={`h-full p-12 flex-1 flex flex-col justify-between border border-border-default rounded-2xl ${styles.heightMin}`}
            >
              <div className="text-[32px] leading-[120%] tracking-[1px] font-forum">
                SUSHI ARTISTRY
                <br />
                REDEFINED
              </div>
              <div className="text-[16px] leading-[180%] tracking-[0px] font-satoshi">
                Where culinary craftsmanship meets modern elegance. Indulge in
                the finest sushi, expertly curated to elevate your dining
                experience.
              </div>
            </div>
            <ImageSlider
              ref={staggeredRightAddToRefs}
              className="flex-1 aspect-square"
              imagesSrc={topSlider}
              imageProps={{
                sizes:
                  "(max-width: 810px) 100vw, (max-width: 1280px) 50vw, 25vw",
              }}
            />
          </div>
          <div
            ref={staggeredMiddleContainerRef}
            className={`h-min flex flex-row gap-4 ${styles.middleLine}`}
          >
            <TileWithStars
              ref={staggeredMiddleAddToRefs}
              header="TRIP ADVISOR"
              description={["BEST STEAK HOUSE", "PRAGUE"]}
            />
            <TileWithStars
              ref={staggeredMiddleAddToRefs}
              header="MICHELIN GUIDE"
              description={["BEST STEAK HOUSE", "PRAGUE"]}
            />
            <TileWithStars
              ref={staggeredMiddleAddToRefs}
              header="STAR DINING"
              description={["BEST STEAK HOUSE", "PRAGUE"]}
            />
          </div>

          <div
            className={`h-full min-h-0 flex flex-row gap-4 ${styles.bottomLine}`}
          >
            <ImageSlider
              ref={staggeredLeftAddToRefs}
              className="flex-1 aspect-square"
              imagesSrc={bottomSlider}
              imageProps={{
                sizes:
                  "(max-width: 810px) 100vw, (max-width: 1280px) 50vw, 25vw",
              }}
            />
            <div
              ref={staggeredRightAddToRefs}
              className={`flex-1 h-full p-12 flex flex-col justify-between border border-border-default rounded-2xl ${styles.heightMin}`}
            >
              <HeadingDecorated className="font-forum text-[24px] leading-[120%] tracking-[1px]">
                OUR STORY
              </HeadingDecorated>
              <div className="text-[16px] leading-[180%] tracking-[0px] font-satoshi">
                Founded with a passion for culinary excellence, Qitchen's
                journey began in the heart of Prague. Over years, it evolved
                into a haven for sushi enthusiasts, celebrated for its artful
                mastery and devotion to redefining gastronomy.
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </>
  );
}
