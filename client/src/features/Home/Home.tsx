import React, { useState } from "react";
import styles from "./Home.module.css";
import LinkIcon from "./components/LinkIcon/LinkIcon";
import CornerMenu from "./components/CornerMenu/CornerMenu";
import RollingAnimation from "./components/RollingText/RollingText";
import LinkIconAnimated from "./components/LinkIcon/LinkIconAnimated";
import heroVideo from "../../assets/StartingPageMaterials/videos/main.mp4";
import { useNavigate } from "react-router-dom";
import CardContextProvider from "../../context/CardContext/CardContextProvider";
import CardWithContextHover from "../../shared/components/Card/CardIsHoveredContext";
import HeroCard from "../../shared/components/HeroCard/HeroCard";
import { useStaggeredReveal } from "../../shared/hooks/useStaggeredReveal.hook";
import { SEO } from "../../shared/components/SEO/SEO";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [isHeroAnimationDone, setIsHeroAnimationDone] = useState(false);

  const {
    containerRef: staggeredLeftContainerRef,
    addToRefs: staggeredLeftAddToRefs,
  } = useStaggeredReveal({
    stagger: 0.2,
    y: -50,
    duration: 1,
    onProgress: () => {
      setIsHeroAnimationDone(true);
    },
    progressThreshold: 0.3,
  });

  const {
    containerRef: staggeredRightContainerRef,
    addToRefs: staggeredRightAddToRefs,
  } = useStaggeredReveal({
    stagger: 0.2,
    x: 50,
    duration: 1,
    triggerByElement: true,
    start: "top 95%",
    toggleActions: "play reverse play reverse",
    end: "bottom 5%",
  });

  return (
    <>
      <SEO />
      <div
        ref={staggeredLeftContainerRef}
        className={`${styles.mainSection} font-forum w-full h-[100dvh] max-h-[100dvh] box-border bg-background-default p-6 flex flex-col lg:flex-row gap-4 overflow-hidden`}
      >
        <div
          className={`flex-[2] h-full min-h-0 min-w-0 relative ${styles.heroSectionWrapper}`}
        >
          <HeroCard
            ref={staggeredLeftAddToRefs}
            className={`${styles.heroSection} w-full h-full flex relative rounded-2xl`}
            heading={["SUSHI", "SENSATION"]}
            enableHeadingAnimation={isHeroAnimationDone}
            mediaType="video"
            mediaSrc={heroVideo}
          >
            <CornerMenu
              className={`${styles.heroCornerMenu} pr-4 pb-4 pt-6 pl-6 gap-2`}
            >
              <LinkIcon
                className="block p-2.5"
                imageSrc="/shared/icons/instagramLogo.svg"
                href="https://github.com/Dmialti"
                alt="instagram link logo"
              />
              <LinkIcon
                className="block p-2.5"
                imageSrc="/shared/icons/facebookLogo.svg"
                href="https://github.com/Dmialti"
                alt="facebook link logo"
              />
              <LinkIcon
                className="block p-2.5"
                imageSrc="/shared/icons/xLogo.svg"
                href="https://github.com/Dmialti"
                alt="x link logo"
              />
            </CornerMenu>
          </HeroCard>
        </div>

        <div
          ref={staggeredRightContainerRef}
          className={`flex-1 flex flex-col gap-4 h-full min-h-0 min-w-0 ${styles.cardsSection}`}
        >
          <div className="flex-1 min-h-0 relative w-full">
            <CardContextProvider>
              <CardWithContextHover
                className={`${styles.cardContainer} w-full h-full cursor-pointer invisible rounded-2xl`}
                mediaType="image"
                mediaSrc="side-1.png"
                formats={["avif", "webp", "png"]}
                isAnimated={true}
                onClick={() => navigate("/menu")}
                ref={staggeredRightAddToRefs}
                alt="menu section image"
              >
                <CornerMenu
                  className={`${styles.cornerMenu} pointer-events-none text-white pt-3 pl-6 gap-3`}
                >
                  <RollingAnimation>MENU</RollingAnimation>
                  <LinkIconAnimated
                    className={`${styles.linkIcon} block p-2.5`}
                    imageSrc="/StartingPageMaterials/icons/arrowLogo.svg"
                  />
                </CornerMenu>
              </CardWithContextHover>
            </CardContextProvider>
          </div>

          <div className="flex-1 min-h-0 relative w-full">
            <CardContextProvider>
              <CardWithContextHover
                className={`${styles.cardContainer} w-full h-full cursor-pointer invisible rounded-2xl`}
                mediaType="image"
                mediaSrc="side-2.png"
                formats={["avif", "webp", "png"]}
                isAnimated={true}
                onClick={() => navigate("/reservation")}
                ref={staggeredRightAddToRefs}
                alt="reservation section image"
              >
                <CornerMenu
                  className={`${styles.cornerMenu} pointer-events-none text-white pt-3 pl-6 gap-3`}
                >
                  <RollingAnimation>RESERVATION</RollingAnimation>
                  <LinkIconAnimated
                    className={`${styles.linkIcon} block p-2.5`}
                    imageSrc="/StartingPageMaterials/icons/arrowLogo.svg"
                  />
                </CornerMenu>
              </CardWithContextHover>
            </CardContextProvider>
          </div>

          <div className="flex-1 min-h-0 relative w-full">
            <CardContextProvider>
              <CardWithContextHover
                className={`${styles.cardContainer} w-full h-full cursor-pointer invisible rounded-2xl`}
                mediaType="image"
                mediaSrc="side-3.png"
                formats={["avif", "webp", "png"]}
                isAnimated={true}
                onClick={() => navigate("/about")}
                ref={staggeredRightAddToRefs}
                alt="about section image"
              >
                <CornerMenu
                  className={`${styles.cornerMenu} pointer-events-none text-white pt-3 pl-6 gap-3`}
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
      </div>
    </>
  );
};

export default Home;
