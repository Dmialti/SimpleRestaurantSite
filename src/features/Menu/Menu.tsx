import React from "react";
import Card from "../shared/components/Card/Card";
import styles from "./Menu.module.css";
import BottomGradient from "../shared/components/BottomGradient/BottomGradient";

const Menu: React.FC = () => {
  return (
    <div className="w-full h-full box-border flex flex-row">
      <Card
        className="flex-1 h-full relative"
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
      <div className="h-full flex-1"> </div>
    </div>
  );
};

export default Menu;
