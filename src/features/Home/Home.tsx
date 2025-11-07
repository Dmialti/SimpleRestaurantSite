import React from "react";
import styles from "./Home.module.css";
import Card from "./components/Card/Card";
import LinkIcon from "./components/LinkIcon/LinkIcon";
import CornerMenu from "./components/CornerMenu/CornerMenu";
import RollingAnimation from "./components/RollingText/RollingText";
import CardContextProvider from "./context/CardContext/CardContextProvider";
import LinkIconAnimated from "./components/LinkIcon/LinkIconAnimated";

const Home: React.FC = () => {
  return (
    <div
      className={`${styles.mainSection} font-forum w-screen h-screen bg-background-default gap-4 p-6`}
    >
      <CardContextProvider>
        <Card
          className={`${styles.heroSection} relative`}
          mediaType="video"
          mediaSrc="/StartingPageMaterials/videos/main.mp4"
        >
          <div className="absolute left-19.25 bottom-13 text-[140px] tracking-[3px] text-text-default">
            <p>SUSHI</p>
            <p>SENSATION</p>
          </div>
          <CornerMenu className="pr-4 pb-4 pt-6 pl-6 gap-2">
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
      </CardContextProvider>
      <div
        className={`${styles.cardsSection} h-full overflow-hidden flex gap-4`}
      >
        <CardContextProvider>
          <Card
            className="flex-1 relative"
            mediaType="image"
            mediaSrc="/StartingPageMaterials/images/side-1.png"
            isAnimated={true}
          >
            <CornerMenu className="text-white pt-3 pl-6 gap-3">
              <RollingAnimation>MENU</RollingAnimation>
              <LinkIconAnimated
                className="block p-2.5"
                imageSrc="/StartingPageMaterials/icons/arrowLogo.svg"
              />
            </CornerMenu>
          </Card>
        </CardContextProvider>
        <CardContextProvider>
          <Card
            className="flex-1 relative"
            mediaType="image"
            mediaSrc="/StartingPageMaterials/images/side-2.png"
            isAnimated={true}
          >
            <CornerMenu className="text-white pt-3 pl-6 gap-3">
              <RollingAnimation>RESERVATION</RollingAnimation>
              <LinkIconAnimated
                className="block p-2.5"
                imageSrc="/StartingPageMaterials/icons/arrowLogo.svg"
              />
            </CornerMenu>
          </Card>
        </CardContextProvider>
        <CardContextProvider>
          <Card
            className="flex-1 relative"
            mediaType="image"
            mediaSrc="/StartingPageMaterials/images/side-3.png"
            isAnimated={true}
          >
            <CornerMenu className="text-white pt-3 pl-6 gap-3">
              <RollingAnimation>OUR RESTAURANT</RollingAnimation>
              <LinkIconAnimated
                className="block p-2.5"
                imageSrc="/StartingPageMaterials/icons/arrowLogo.svg"
              />
            </CornerMenu>
          </Card>
        </CardContextProvider>
      </div>
    </div>
  );
};

export default Home;
