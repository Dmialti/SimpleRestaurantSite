"use client";

import styles from "./ContactContent.module.css";
import contactHero from "@/assets/ContactPageMaterials/contactHero.webp";

import CardContextProvider from "@/context/CardContext/CardContextProvider";
import BasePageLayout from "@/shared/components/BasePageLayout/BasePageLayout";
import CardWithContextHover from "@/shared/components/Card/CardIsHoveredContext";
import HeadingDecorated from "@/shared/components/HeadingDecorated/HeadingDecorated";
import { useStaggeredReveal } from "@/shared/hooks/useStaggeredReveal.hook";
import { mergeRefs } from "@/shared/utils/helpers/mergeRefs.helper";
import { instagramImages } from "../../static/instagramImagesSrcs";
import IconCardFill from "../IconCardFill/IconCardFill";
import MapComponent from "../MapComponent/MapComponent";
import { useState } from "react";

import { schedule } from "./static/schedule";
import ScheduleList from "../ScheduleList/ScheduleList";
import InstagramImage from "../InstagramImage/InstagramImage";

export default function ContactContent() {
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
    <BasePageLayout
      isScreenHeight={true}
      heroCardProps={{
        heading: ["CONTACT"],
        mediaType: "image",
        imageProps: { src: contactHero, alt: "contact hero image" },
      }}
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
          className={`min-w-0 border border-border-default rounded-2xl py-13.5 px-12 flex flex-col justify-between ${styles.scheduleSection} invisible`}
        >
          <HeadingDecorated
            ref={staggeredTextTopAddToRefs}
            className="text-[30px] leading-[120%] tracking-[1px] font-forum invisible"
          >
            OPENING HOURS
          </HeadingDecorated>
          <ScheduleList
            scheduleValues={schedule}
            addToRefs={staggeredTopAddToRefs}
          />
        </div>
        <div
          ref={staggeredTopAddToRefs}
          className={`gap-4 ${styles.gallerySection} invisible`}
        >
          {instagramImages.map((imageSrc, index) => (
            <InstagramImage
              key={index}
              src={imageSrc}
              alt={`instagram image ${index}`}
              fill={true}
              sizes="(max-width: 810px) 50vw, (max-width: 1280px) 25vw, 14vw"
            />
          ))}
        </div>
        <div
          ref={staggeredBottomAddToRefs}
          className={` ${styles.mapSection} invisible`}
        >
          <MapComponent />
        </div>
        <div
          ref={staggeredBottomAddToRefs}
          className={`min-w-0 border border-border-default rounded-2xl py-13.5 px-12 flex flex-col justify-between ${styles.contactsSection} invisible`}
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
                    className="w-4.5 h-4.5"
                    src="/shared/icons/facebookLogo.svg"
                    alt="facebook icon"
                  />
                </a>
                <a
                  className="flex items-center"
                  href="https://github.com/Dmialti"
                >
                  <img
                    className="w-4.5 h-4.5"
                    src="/shared/icons/instagramLogo.svg"
                    alt="instagram icon"
                  />
                </a>
                <a
                  className="flex items-center"
                  href="https://github.com/Dmialti"
                >
                  <img
                    className="w-4.5 h-4.5"
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
  );
}
