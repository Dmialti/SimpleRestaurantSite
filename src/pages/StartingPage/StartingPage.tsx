import React from "react";
import styles from "./StartingPage.module.css";

const StartingPage: React.FC = () => {
  return (
    <div
      className={`${styles.mainSection} w-screen h-screen bg-[#0A0B0A] gap-4 p-6`}
    >
      <div className={`${styles.heroSection} rounded-2xl`}>
        <img
          className="h-full w-full object-center object-cover"
          src="/StartingPageMaterials/images/main.png"
          alt=""
        />
      </div>
      <div
        className={`${styles.cardsSection} h-full overflow-hidden flex gap-4`}
      >
        <div
          className={`${styles.cardContainer} h-full w-full overflow-hidden rounded-2xl`}
        >
          <img
            className="h-full w-full object-center object-cover block"
            src="/StartingPageMaterials/images/side-1.png"
            alt=""
          />
        </div>
        <div
          className={`${styles.cardContainer} h-full w-full overflow-hidden rounded-2xl`}
        >
          <img
            className="h-full w-full object-center object-cover block"
            src="/StartingPageMaterials/images/side-2.png"
            alt=""
          />
        </div>
        <div
          className={`${styles.cardContainer} h-full w-full overflow-hidden rounded-2xl`}
        >
          <img
            className="h-full w-full object-center object-cover block"
            src="/StartingPageMaterials/images/side-3.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default StartingPage;
