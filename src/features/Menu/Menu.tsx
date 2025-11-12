import React from "react";
import styles from "./Menu.module.css";
import Button from "../shared/components/Button/Button";
import sushi from "./static/sushi/sushi";
import DishSection from "./components/DishSection/DishSection";
import BasePageLayout from "../shared/components/BasePageLayout/BasePageLayout";

const Menu: React.FC = () => {
  return (
    <BasePageLayout
      isScreenHeight={false}
      heading={["MENU"]}
      mediaType="image"
      mediaSrc="/MenuPageMaterials/menuHero.png"
    >
      <div
        className={`${styles.listContainer} h-fit rounded-2xl pt-8 pb-20 px-24 text-text-default`}
      >
        <div className="flex gap-1 justify-center font-satoshi flex-wrap">
          <Button
            type="border"
            className="px-3 py-1 text-[12px] tracking-[1px] leading-[190%]"
          >
            MAKI
          </Button>
          <Button
            type="border"
            className="px-3 py-1 text-[12px] tracking-[1px] leading-[190%]"
          >
            URAMAKI
          </Button>
          <Button
            type="border"
            className="px-3 py-1 text-[12px] tracking-[1px] leading-[190%]"
          >
            SPECIAL ROLLS
          </Button>
        </div>
        <div>
          <DishSection category="MAKI" items={sushi.makiList} />
          <DishSection category="URAMAKI" items={sushi.uraMakiList} />
          <DishSection
            category="SPECIAL ROLLS"
            items={sushi.specialRollsList}
          />
        </div>
      </div>
    </BasePageLayout>
  );
};

export default Menu;
