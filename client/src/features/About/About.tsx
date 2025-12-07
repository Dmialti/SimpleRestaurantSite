import React from "react";
import TileWithStars from "./components/TileWithStars/TileWithStars";
import styles from "./About.module.css";

import aboutHero from "../../assets/AboutPageMaterials/aboutHero.png";
import topImage1 from "../../assets/AboutPageMaterials/imageScrollers/top/image1.webp";
import topImage2 from "../../assets/AboutPageMaterials/imageScrollers/top/image2.webp";
import topImage3 from "../../assets/AboutPageMaterials/imageScrollers/top/image3.webp";
import bottomImage1 from "../../assets/AboutPageMaterials/imageScrollers/bottom/image1.webp";
import bottomImage2 from "../../assets/AboutPageMaterials/imageScrollers/bottom/image2.webp";
import bottomImage3 from "../../assets/AboutPageMaterials/imageScrollers/bottom/image3.webp";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import HeadingDecorated from "../../shared/components/HeadingDecorated/HeadingDecorated";
import ImageSlider from "../../shared/components/ImageSlider/ImageSlider";

const About: React.FC = () => {
  return (
    <BasePageLayout
      isScreenHeight={true}
      heading={["ABOUT"]}
      mediaType="image"
      mediaSrc={aboutHero}
      className="border-none"
    >
      <div
        className={`h-full flex flex-col gap-4 text-text-default ${styles.mainContainer}`}
      >
        <div className={`h-full min-h-0 flex flex-row gap-4 ${styles.topLine}`}>
          <div
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
            className="flex-1 aspect-square"
            imagesSrc={[topImage1, topImage2, topImage3]}
          />
        </div>
        <div className={`h-min flex flex-row gap-4 ${styles.middleLine}`}>
          <TileWithStars
            header="TRIP ADVISOR"
            description={["BEST STEAK HOUSE", "PRAGUE"]}
          />
          <TileWithStars
            header="MICHELIN GUIDE"
            description={["BEST STEAK HOUSE", "PRAGUE"]}
          />
          <TileWithStars
            header="STAR DINING"
            description={["BEST STEAK HOUSE", "PRAGUE"]}
          />
        </div>

        <div
          className={`h-full min-h-0 flex flex-row gap-4 ${styles.bottomLine}`}
        >
          <ImageSlider
            className="flex-1 aspect-square"
            imagesSrc={[bottomImage1, bottomImage2, bottomImage3]}
          />
          <div
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
