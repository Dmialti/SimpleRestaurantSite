import React from "react";
import styles from "./Home.module.css";
import LinkIcon from "./components/LinkIcon/LinkIcon";
import CornerMenu from "./components/CornerMenu/CornerMenu";
import RollingAnimation from "./components/RollingText/RollingText";
import LinkIconAnimated from "./components/LinkIcon/LinkIconAnimated";
import heroVideo from "../../assets/StartingPageMaterials/videos/main.mp4";
import menuImg from "../../assets/StartingPageMaterials/images/side-1.png";
import reservationImg from "../../assets/StartingPageMaterials/images/side-2.png";
import aboutImg from "../../assets/StartingPageMaterials/images/side-3.png";
import { useNavigate } from "react-router-dom";
import CardContextProvider from "../../context/CardContext/CardContextProvider";
import CardWithContextHover from "../../shared/components/Card/CardIsHoveredContext";
import HeroCard from "../../shared/components/HeroCard/HeroCard";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.mainSection} font-forum w-full h-screen bg-background-default gap-4 p-6`}
    >
      <HeroCard
        className={`${styles.heroSection} h-full w-full flex relative`}
        heading={["SUSHI", "SENSATION"]}
        mediaType="video"
        mediaSrc={heroVideo}
      >
        <CornerMenu
          className={`${styles.heroCornerMenu} pr-4 pb-4 pt-6 pl-6 gap-2`}
        >
          <LinkIcon
            className="block p-2.5"
            imageSrc="/shared/icons/instagramLogo.svg"
          />
          <LinkIcon
            className="block p-2.5"
            imageSrc="/shared/icons/facebookLogo.svg"
          />
          <LinkIcon
            className="block p-2.5"
            imageSrc="/shared/icons/xLogo.svg"
          />
        </CornerMenu>
      </HeroCard>
      <div
        className={`${styles.cardsSection} h-full overflow-hidden flex gap-4`}
      >
        <CardContextProvider>
          <CardWithContextHover
            className={`${styles.cardContainer} h-full w-full flex-1 relative cursor-pointer`}
            mediaType="image"
            mediaSrc={menuImg}
            isAnimated={true}
            onClick={() => navigate("/menu")}
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
            className={`${styles.cardContainer} h-full w-full flex-1 relative cursor-pointer`}
            mediaType="image"
            mediaSrc={reservationImg}
            isAnimated={true}
            onClick={() => navigate("/reservation")}
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
            className={`${styles.cardContainer} h-full w-full flex-1 relative cursor-pointer`}
            mediaType="image"
            mediaSrc={aboutImg}
            isAnimated={true}
            onClick={() => navigate("/about")}
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
