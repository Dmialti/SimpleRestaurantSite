import React, { useState } from "react";
import styles from "./Contact.module.css";
import MapComponent from "./components/MapComponent/MapComponent";
import IconCardFill from "./components/IconCardFill/IconCardFill";
import CardContextProvider from "../../context/CardContext/CardContextProvider";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import CardWithContextHover from "../../shared/components/Card/CardIsHoveredContext";
import HeadingDecorated from "../../shared/components/HeadingDecorated/HeadingDecorated";
import { useStaggeredReveal } from "../../shared/hooks/useStaggeredReveal.hook";
import { mergeRefs } from "../../shared/utils/helpers/mergeRefs.helper";
import { SEO } from "../../shared/components/SEO/SEO";
import seoImage from "././../../assets/ContactPageMaterials/contactHero.avif";

const Contact: React.FC = () => {
  const [enableTextTopAnimation, setEnableTextTopAnimation] =
    useState<boolean>(false);
  const [enableTextBottomAnimation, setEnableTextBottomAnimation] =
    useState<boolean>(false);

  const {
    containerRef: staggeredTopContainerRef,
    addToRefs: staggeredTopAddToRefs,
  } = useStaggeredReveal({
    stagger: 0,
    y: -50,
    duration: 1,
    toggleActions: "play reverse play reverse",
    start: "top 95%",
    end: "bottom 5%",
    responsive: {
      "(max-width: 1280px)": {
        y: 0,
        x: 50,
      },
    },
    triggerByElement: true,
    onComplete: () => {
      setEnableTextTopAnimation(true);
    },
  });

  const {
    containerRef: staggeredBottomContainerRef,
    addToRefs: staggeredBottomAddToRefs,
  } = useStaggeredReveal({
    stagger: 0,
    y: 50,
    duration: 1,
    toggleActions: "play reverse play reverse",
    start: "top 95%",
    end: "bottom 5%",
    responsive: {
      "(max-width: 1280px)": {
        y: 0,
        x: 50,
      },
    },
    triggerByElement: true,
    onComplete: () => {
      setEnableTextBottomAnimation(true);
    },
  });

  const {
    containerRef: staggeredTextTopContainerRef,
    addToRefs: staggeredTextTopAddToRefs,
  } = useStaggeredReveal({
    stagger: 0,
    y: -50,
    duration: 0.5,
    enable: enableTextTopAnimation,
  });

  const {
    containerRef: staggeredTextBottomContainerRef,
    addToRefs: staggeredTextBottomAddToRefs,
  } = useStaggeredReveal({
    stagger: 0,
    y: -50,
    duration: 0.5,
    enable: enableTextBottomAnimation,
  });

  return (
    <>
      <SEO
        title="Contact & Location"
        description="Visit Qitchen in the heart of the city. Find our address, phone number, and opening hours. We are ready to welcome you for an unforgettable Japanese dining experience."
        image={seoImage}
      />
      <BasePageLayout
        isScreenHeight={true}
        heading={["CONTACT"]}
        mediaType="image"
        mediaSrc="contactHero.png"
        className="border-none"
        enableContentAnimation={false}
      >
        <div
          ref={mergeRefs(
            staggeredTopContainerRef,
            staggeredBottomContainerRef,
            staggeredTextTopContainerRef,
            staggeredTextBottomContainerRef
          )}
          className={`h-full w-full gap-4 text-text-default ${styles.contentSection}`}
        >
          <div
            ref={staggeredTopAddToRefs}
            className={`min-w-0 border border-border-default rounded-2xl py-[54px] px-12 flex flex-col justify-between ${styles.scheduleSection} invisible`}
          >
            <HeadingDecorated
              ref={staggeredTextTopAddToRefs}
              className="text-[30px] leading-[120%] tracking-[1px] font-forum invisible"
            >
              OPENING HOURS
            </HeadingDecorated>
            <ul
              ref={staggeredTextTopAddToRefs}
              className={`text-nowrap flex flex-col gap-4 text-[24px] leading-[200%] tracking-[0px] font-forum ${styles.scheduleList} invisible`}
            >
              <li className="flex flex-row gap-4 justify-between">
                <div>Mon</div>
                <div
                  className={`w-full border-border-default border-dotted border-b-2 mb-[6px] ${styles.scheduleDecor}`}
                ></div>
                <div>16:00 - 22:30</div>
              </li>
              <li className="flex flex-row gap-4 justify-between">
                <div>Tue</div>
                <div
                  className={`w-full border-border-default border-dotted border-b-2 mb-[6px] ${styles.scheduleDecor}`}
                ></div>
                <div>16:00 - 22:30</div>
              </li>
              <li className="flex flex-row gap-4 justify-between">
                <div>Wed</div>
                <div
                  className={`w-full border-border-default border-dotted border-b-2 mb-[6px] ${styles.scheduleDecor}`}
                ></div>
                <div>16:00 - 22:30</div>
              </li>
              <li className="flex flex-row gap-4 justify-between">
                {" "}
                <div>Thu</div>
                <div
                  className={`w-full border-border-default border-dotted border-b-2 mb-[6px] ${styles.scheduleDecor}`}
                ></div>
                <div>16:00 - 22:30</div>
              </li>
              <li className="flex flex-row gap-4 justify-between">
                <div>Fri</div>
                <div
                  className={`w-full border-border-default border-dotted border-b-2 mb-[6px] ${styles.scheduleDecor}`}
                ></div>
                <div>16:00 - 22:30</div>
              </li>
              <li className="flex flex-row gap-4 justify-between">
                <div>Sat & Sun</div>
                <div
                  className={`w-full border-border-default border-dotted border-b-2 mb-[6px] ${styles.scheduleDecor}`}
                ></div>
                <div>16:00 - 22:30</div>
              </li>
            </ul>
          </div>
          <div
            ref={staggeredTopAddToRefs}
            className={`gap-4 ${styles.gallerySection} invisible`}
          >
            <CardContextProvider>
              <CardWithContextHover
                className="relative"
                mediaType={"image"}
                mediaSrc="contactImage1.webp"
                isAnimated={true}
                alt="instagram link image 1"
              >
                <IconCardFill
                  alt="instagram link icon"
                  src="shared/icons/instagramLogo.svg"
                />
              </CardWithContextHover>
            </CardContextProvider>
            <CardContextProvider>
              <CardWithContextHover
                className="relative"
                mediaType={"image"}
                mediaSrc="contactImage2.png"
                isAnimated={true}
                alt="instagram link image 2"
              >
                <IconCardFill
                  alt="instagram link icon"
                  src="shared/icons/instagramLogo.svg"
                />
              </CardWithContextHover>
            </CardContextProvider>
            <CardContextProvider>
              <CardWithContextHover
                className="relative"
                mediaType={"image"}
                mediaSrc="contactImage3.png"
                isAnimated={true}
                alt="instagram link image 3"
              >
                <IconCardFill
                  alt="instagram link icon"
                  src="shared/icons/instagramLogo.svg"
                />
              </CardWithContextHover>
            </CardContextProvider>
            <CardContextProvider>
              <CardWithContextHover
                className="relative"
                mediaType={"image"}
                mediaSrc="contactImage4.png"
                isAnimated={true}
                alt="instagram link image 4"
              >
                <IconCardFill
                  alt="instagram link icon"
                  src="shared/icons/instagramLogo.svg"
                />
              </CardWithContextHover>
            </CardContextProvider>
          </div>
          <div
            ref={staggeredBottomAddToRefs}
            className={` ${styles.mapSection} invisible`}
          >
            <MapComponent />
          </div>
          <div
            ref={staggeredBottomAddToRefs}
            className={`min-w-0 border border-border-default rounded-2xl py-[54px] px-12 flex flex-col justify-between ${styles.contactsSection} invisible`}
          >
            <HeadingDecorated
              ref={staggeredTextBottomAddToRefs}
              className="text-[30px] leading-[120%] tracking-[1px] font-forum invisible"
            >
              GET IN TOUCH
            </HeadingDecorated>
            <ul
              ref={staggeredTextBottomAddToRefs}
              className={`flex flex-col gap-4 text-[24px] leading-[200%] tracking-[0px] font-satoshi ${styles.contactsList} invisible`}
            >
              <li className="flex flex-row gap-4 justify-between">
                <div>ADDRESS</div>
                <div className="text-end">
                  23 Greenfield Avenue, Prague 120 00
                </div>
              </li>
              <li className="flex flex-row gap-4 justify-between">
                <div>PHONE</div>
                <div className="text-end">+49 1234 567890</div>
              </li>
              <li className="flex flex-row gap-4 justify-between">
                <div>EMAIL</div>
                <div className="text-end">email@example.com</div>
              </li>
              <li className="flex flex-row gap-4 justify-between">
                <div>FOLLOW</div>
                <div className="flex flex-row flex-wrap justify-end gap-3">
                  <a
                    className="flex items-center"
                    href="https://github.com/Dmialti"
                  >
                    <img
                      className="w-[18px] h-[18px]"
                      src="/shared/icons/facebookLogo.svg"
                      alt="facebook icon"
                    />
                  </a>
                  <a
                    className="flex items-center"
                    href="https://github.com/Dmialti"
                  >
                    <img
                      className="w-[18px] h-[18px]"
                      src="/shared/icons/instagramLogo.svg"
                      alt="instagram icon"
                    />
                  </a>
                  <a
                    className="flex items-center"
                    href="https://github.com/Dmialti"
                  >
                    <img
                      className="w-[18px] h-[18px]"
                      src="/shared/icons/xLogo.svg"
                      alt="x icon"
                    />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </BasePageLayout>
    </>
  );
};

export default Contact;
