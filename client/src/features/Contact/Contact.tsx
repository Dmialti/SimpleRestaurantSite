import React from "react";
import BasePageLayout from "../shared/components/BasePageLayout/BasePageLayout";
import styles from "./Contact.module.css";
import HeadingDecorated from "../shared/components/HeadingDecorated/HeadingDecorated";
import MapComponent from "./components/MapComponent/MapComponent";
import CardWithContextHover from "../shared/components/Card/CardIsHoveredContext";
import CardContextProvider from "../shared/context/CardContext/CardContextProvider";
import IconCardFill from "./components/IconCardFill/IconCardFill";

const Contact: React.FC = () => {
  return (
    <BasePageLayout
      isScreenHeight={true}
      heading={["CONTACT"]}
      mediaType="image"
      mediaSrc="/ContactPageMaterials/contactHero.png"
      className="border-none"
    >
      <div
        className={`h-full w-full gap-4 text-text-default ${styles.contentSection}`}
      >
        <div
          className={`min-w-0 border border-border-default rounded-2xl py-[54px] px-12 flex flex-col justify-between ${styles.scheduleSection}`}
        >
          <HeadingDecorated className="text-[24px] leading-[120%] tracking-[1px] font-forum">
            OPENING HOURS
          </HeadingDecorated>
          <ul className="text-nowrap flex flex-col gap-4 text-[16px] leading-[180%] tracking-[0px] font-satoshi">
            <li className="flex flex-row gap-4 justify-between">
              <div>Mon</div>
              <div className="w-full border-border-default border-dotted border-b-2 mb-[6px]"></div>
              <div>16:00 - 22:30</div>
            </li>
            <li className="flex flex-row gap-4 justify-between">
              <div>Tue</div>
              <div className="w-full border-border-default border-dotted border-b-2 mb-[6px]"></div>
              <div>16:00 - 22:30</div>
            </li>
            <li className="flex flex-row gap-4 justify-between">
              <div>Wed</div>
              <div className="w-full border-border-default border-dotted border-b-2 mb-[6px]"></div>
              <div>16:00 - 22:30</div>
            </li>
            <li className="flex flex-row gap-4 justify-between">
              <div>Thu</div>
              <div className="w-full border-border-default border-dotted border-b-2 mb-[6px]"></div>
              <div>16:00 - 22:30</div>
            </li>
            <li className="flex flex-row gap-4 justify-between">
              <div>Fri</div>
              <div className="w-full border-border-default border-dotted border-b-2 mb-[6px]"></div>
              <div>16:00 - 22:30</div>
            </li>
            <li className="flex flex-row gap-4 justify-between">
              <div>Sat & Sun</div>
              <div className="w-full border-border-default border-dotted border-b-2 mb-[6px]"></div>
              <div>16:00 - 22:30</div>
            </li>
          </ul>
        </div>
        <div className={`gap-4 ${styles.gallerySection}`}>
          <CardContextProvider>
            <CardWithContextHover
              className="relative"
              mediaType={"image"}
              mediaSrc={"/ContactPageMaterials/content/Image1.png"}
              isAnimated={true}
            >
              <IconCardFill iconSrc="shared/icons/instagramLogo.svg" />
            </CardWithContextHover>
          </CardContextProvider>
          <CardContextProvider>
            <CardWithContextHover
              className="relative"
              mediaType={"image"}
              mediaSrc={"/ContactPageMaterials/content/Image2.png"}
              isAnimated={true}
            >
              <IconCardFill iconSrc="shared/icons/instagramLogo.svg" />
            </CardWithContextHover>
          </CardContextProvider>
          <CardContextProvider>
            <CardWithContextHover
              className="relative"
              mediaType={"image"}
              mediaSrc={"/ContactPageMaterials/content/Image3.png"}
              isAnimated={true}
            >
              <IconCardFill iconSrc="shared/icons/instagramLogo.svg" />
            </CardWithContextHover>
          </CardContextProvider>
          <CardContextProvider>
            <CardWithContextHover
              className="relative"
              mediaType={"image"}
              mediaSrc={"/ContactPageMaterials/content/Image4.png"}
              isAnimated={true}
            >
              <IconCardFill iconSrc="shared/icons/instagramLogo.svg" />
            </CardWithContextHover>
          </CardContextProvider>
        </div>
        <div className={` ${styles.mapSection}`}>
          <MapComponent />
        </div>
        <div
          className={`min-w-0 border border-border-default rounded-2xl py-[54px] px-12 flex flex-col justify-between ${styles.contactsSection}`}
        >
          <HeadingDecorated className="text-[24px] leading-[120%] tracking-[1px] font-forum text-nowrap">
            GET IN TOUCH
          </HeadingDecorated>
          <ul className=" flex flex-col gap-4 text-[16px] leading-[180%] tracking-[0px] font-satoshi">
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
              <div className="flex flex-row justify-end gap-3">
                <img
                  className="w-[18px] h-[18px]"
                  src="/shared/icons/facebookLogo.svg"
                />
                <img
                  className="w-[18px] h-[18px]"
                  src="/shared/icons/instagramLogo.svg"
                />
                <img
                  className="w-[18px] h-[18px]"
                  src="/shared/icons/xLogo.svg"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </BasePageLayout>
  );
};

export default Contact;
