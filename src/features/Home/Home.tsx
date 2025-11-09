import React from "react";
import styles from "./Home.module.css";
import LinkIcon from "./components/LinkIcon/LinkIcon";
import CornerMenu from "./components/CornerMenu/CornerMenu";
import RollingAnimation from "./components/RollingText/RollingText";
import CardContextProvider from "../shared/context/CardContext/CardContextProvider";
import LinkIconAnimated from "./components/LinkIcon/LinkIconAnimated";
import Card from "../shared/components/Card/Card";
import CardWithContextHover from "../shared/components/Card/CardIsHoveredContext";
import BottomGradient from "../shared/components/BottomGradient/BottomGradient";

const Home: React.FC = () => {
  return (
    <div
      className={`${styles.mainSection} font-forum w-full h-screen bg-background-default gap-4`}
    >
      <Card
        className={`${styles.heroSection} relative`}
        mediaType="video"
        mediaSrc="/StartingPageMaterials/videos/main.mp4"
      >
        <BottomGradient />
        <div
          className={`${styles.heroHeader} absolute left-19.25 bottom-13 text-[140px] tracking-[3px] text-text-default`}
        >
          <div>SUSHI</div>
          <div>SENSATION</div>
        </div>
        <CornerMenu
          className={`${styles.heroCornerMenu} pr-4 pb-4 pt-6 pl-6 gap-2`}
        >
          <LinkIcon
            className="block p-2.5"
            imageSrc="/StartingPageMaterials/icons/instagramLogo.svg"
          />
          <LinkIcon
            className="block p-2.5"
            imageSrc="/StartingPageMaterials/icons/facebookLogo.svg"
          />
          <LinkIcon
            className="block p-2.5"
            imageSrc="/StartingPageMaterials/icons/xLogo.svg"
          />
        </CornerMenu>
      </Card>
      <div
        className={`${styles.cardsSection} h-full overflow-hidden flex gap-4`}
      >
        <CardContextProvider>
          <CardWithContextHover
            className={`${styles.cardContainer} flex-1 relative cursor-pointer`}
            mediaType="image"
            mediaSrc="/StartingPageMaterials/images/side-1.png"
            isAnimated={true}
          >
            <CornerMenu
              className={`${styles.cornerMenu} text-white pt-3 pl-6 gap-3`}
            >
              <RollingAnimation>MENU</RollingAnimation>
              <LinkIconAnimated
                className={`${styles.linkIcon} block p-2.5`}
                imageSrc="/StartingPageMaterials/icons/arrowLogo.svg"
              />
            </CornerMenu>
          </CardWithContextHover>
        </CardContextProvider>
        <CardContextProvider>
          <CardWithContextHover
            className={`${styles.cardContainer} flex-1 relative cursor-pointer`}
            mediaType="image"
            mediaSrc="/StartingPageMaterials/images/side-2.png"
            isAnimated={true}
          >
            <CornerMenu
              className={`${styles.cornerMenu} text-white pt-3 pl-6 gap-3`}
            >
              <RollingAnimation>RESERVATION</RollingAnimation>
              <LinkIconAnimated
                className={`${styles.linkIcon} block p-2.5`}
                imageSrc="/StartingPageMaterials/icons/arrowLogo.svg"
              />
            </CornerMenu>
          </CardWithContextHover>
        </CardContextProvider>
        <CardContextProvider>
          <CardWithContextHover
            className={`${styles.cardContainer} flex-1 relative cursor-pointer`}
            mediaType="image"
            mediaSrc="/StartingPageMaterials/images/side-3.png"
            isAnimated={true}
          >
            <CornerMenu
              className={`${styles.cornerMenu} text-white pt-3 pl-6 gap-3`}
            >
              <RollingAnimation>OUR RESTAURANT</RollingAnimation>
              <LinkIconAnimated
                className={`${styles.linkIcon} block p-2.5`}
                imageSrc="/StartingPageMaterials/icons/arrowLogo.svg"
              />
            </CornerMenu>
          </CardWithContextHover>
        </CardContextProvider>
      </div>
    </div>
  );
};

export default Home;
