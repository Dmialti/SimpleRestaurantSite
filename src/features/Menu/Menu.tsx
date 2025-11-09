import React from "react";
import Card from "../shared/components/Card/Card";
import styles from "./Menu.module.css";
import BottomGradient from "../shared/components/BottomGradient/BottomGradient";
import Link from "../shared/components/Link/Link";
import DishItem from "./components/DishItem/DishItem";

const Menu: React.FC = () => {
  return (
    <div
      className={`${styles.menuSection} w-full h-full box-border gap-4 relative`}
    >
      <div className="sticky top-0 h-screen py-6 pl-6">
        <Card
          className={`${styles.heroSection} relative h-full `}
          mediaType="image"
          mediaSrc="/MenuPageMaterials/menuHero.png"
        >
          <BottomGradient />
          <div
            className={`absolute left-16.5 bottom-14 text-[112px] tracking-[2px] leading-none text-text-default font-forum`}
          >
            <div>MENU</div>
          </div>
        </Card>
      </div>
      <div className={`${styles.listSection} py-6 pr-6`}>
        <div
          className={`h-fit border-border-default border-1 rounded-2xl pt-8 pb-20 px-24 text-text-default`}
        >
          <div className="mb-16 flex gap-1 justify-center font-satoshi">
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
            <div className="flex flex-col items-center gap-12 ">
              <div className="flex flex-row justify-center items-center gap-4 font-forum text-[32px] tracking-[1px] leading-[120%]">
                <div>
                  <img src="/MenuPageMaterials/leftSymbol.svg" />
                </div>
                <div>MAKI</div>
                <div>
                  <img src="/MenuPageMaterials/rightSymbol.svg" />
                </div>
              </div>
              <div className="flex flex-col gap-8 max-w-[740px]">
                <DishItem
                  className="flex flex-row gap-6"
                  name="SPICY TUNA MAKI"
                  description="A tantalizing blend of spicy tuna, cucumber, and avocado,
                    harmoniously rolled in nori and seasoned rice."
                  price={5}
                  imageSrc="/MenuPageMaterials/sushi/spicyTunaMaki.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
