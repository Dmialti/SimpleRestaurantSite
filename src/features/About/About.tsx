import React from "react";
import BasePageLayout from "../shared/components/BasePageLayout/BasePageLayout";
import TileWithStars from "./components/TileWithStars/TileWithStars";
import HeadingDecorated from "../shared/components/HeadingDecorated/HeadingDecorated";

interface AboutProps {}

const About: React.FC<AboutProps> = ({}) => {
  return (
    <BasePageLayout
      isScreenHeight={true}
      heading={["ABOUT"]}
      mediaType="image"
      mediaSrc="/AboutPageMaterials/aboutHero.png"
      className="border-none"
    >
      <div className="h-full flex flex-col gap-4 text-text-default">
        <div className="h-full p-12 flex flex-col justify-between border border-border-default rounded-2xl">
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
        <div className="h-full flex flex-row gap-4">
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
        <div className="h-full p-12 flex flex-col justify-between border border-border-default rounded-2xl">
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
    </BasePageLayout>
  );
};

export default About;
