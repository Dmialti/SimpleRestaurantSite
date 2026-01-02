import React from "react";
import TileWithStars from "./components/TileWithStars/TileWithStars";
import styles from "./About.module.css";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import HeadingDecorated from "../../shared/components/HeadingDecorated/HeadingDecorated";
import ImageSlider from "../../shared/components/ImageSlider/ImageSlider";
import { useStaggeredReveal } from "../../shared/hooks/useStaggeredReveal.hook";
import { mergeRefs } from "../../shared/utils/helpers/mergeRefs.helper";

const About: React.FC = () => {
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
    <BasePageLayout
      isScreenHeight={true}
      heading={["ABOUT"]}
      mediaType="image"
      mediaSrc="aboutHero.png"
      className="border-none"
      enableContentAnimation={false}
    >
      <div
        ref={mergeRefs(staggeredLeftContainerRef, staggeredRightContainerRef)}
        className={`h-full flex flex-col wrap-anywhere gap-4 text-text-default ${styles.mainContainer}`}
      >
        <div className={`h-full min-h-0 flex flex-row gap-4 ${styles.topLine}`}>
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
              Where culinary craftsmanship meets modern elegance. Indulge in the
              finest sushi, expertly curated to elevate your dining experience.
            </div>
          </div>
          <ImageSlider
            ref={staggeredRightAddToRefs}
            className="flex-1 aspect-square"
            imagesSrc={["topImage1.webp", "topImage2.webp", "topImage3.webp"]}
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
            imagesSrc={[
              "bottomImage1.webp",
              "bottomImage2.webp",
              "bottomImage3.webp",
            ]}
          />
          <div
            ref={staggeredRightAddToRefs}
            className={`flex-1 h-full p-12 flex flex-col justify-between border border-border-default rounded-2xl ${styles.heightMin}`}
          >
            <HeadingDecorated className="font-forum text-[24px] leading-[120%] tracking-[1px]">
              OUR STORY
            </HeadingDecorated>
            <div className="text-[16px] leading-[180%] tracking-[0px] font-satoshi">
              Founded with a passion for culinary excellence, Qitchen's journey
              began in the heart of Prague. Over years, it evolved into a haven
              for sushi enthusiasts, celebrated for its artful mastery and
              devotion to redefining gastronomy.
            </div>
          </div>
        </div>
      </div>
    </BasePageLayout>
  );
};

export default About;
