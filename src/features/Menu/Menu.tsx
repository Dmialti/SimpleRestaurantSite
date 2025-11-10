import React from "react";
import styles from "./Menu.module.css";
import Link from "../shared/components/Link/Link";
import sushi from "./static/sushi/sushi";
import DishSection from "./components/DishSection/DishSection";
import HeroCard from "../shared/components/HeroCard/HeroCard";

const Menu: React.FC = () => {
  return (
    <div
      className={`${styles.menuSection} w-full h-full box-border gap-4 relative`}
    >
      <div className={`${styles.heroSection} top-0 h-screen py-6 pl-6`}>
        <HeroCard
          heading={["MENU"]}
          className={`relative h-full `}
          mediaType="image"
          mediaSrc="/MenuPageMaterials/menuHero.png"
        />
      </div>
      <div className={`${styles.listSection} py-6 pr-6 min-w-0`}>
        <div
          className={`${styles.listContainer} h-fit border-border-default border-1 rounded-2xl pt-8 pb-20 px-24 text-text-default`}
        >
          <div className="flex gap-1 justify-center font-satoshi flex-wrap">
            <Link
              toggleBorder={true}
              className="px-3 py-1 text-[12px] tracking-[1px] leading-[190%]"
            >
              MAKI
            </Link>
            <Link
              toggleBorder={true}
              className="px-3 py-1 text-[12px] tracking-[1px] leading-[190%]"
            >
              URAMAKI
            </Link>
            <Link
              toggleBorder={true}
              className="px-3 py-1 text-[12px] tracking-[1px] leading-[190%]"
            >
              SPECIAL ROLLS
            </Link>
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
      </div>
    </div>
  );
};

export default Menu;
