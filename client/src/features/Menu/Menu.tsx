import React from "react";
import styles from "./Menu.module.css";
import Button from "../shared/components/Button/Button";
import DishSection from "./components/DishSection/DishSection";
import BasePageLayout from "../shared/components/BasePageLayout/BasePageLayout";
import { useQuery } from "urql";
import { GET_MENU_QUERY } from "../../graphql/menu/queries/getMenu.query";

const Menu: React.FC = () => {
  const [{ data }] = useQuery({ query: GET_MENU_QUERY });

  const categories = data?.getMenu || [];

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
          {categories.map((item) => (
            <Button
              key={item.id}
              type="border"
              className="px-3 py-1 text-[12px] tracking-[1px] leading-[190%]"
            >
              {item.name.toUpperCase()}
            </Button>
          ))}
        </div>
        <div>
          {categories.map((item) => (
            <DishSection
              key={item.id}
              category={item.name}
              dishes={item.dishes}
            />
          ))}
        </div>
      </div>
    </BasePageLayout>
  );
};

export default Menu;
