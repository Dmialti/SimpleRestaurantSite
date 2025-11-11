import React from "react";
import DishItem, { type DishItemProps } from "../DishItem/DishItem";
import styles from "./DishSection.module.css";
import HeadingDecorated from "../../../shared/components/HeadingDecorated/HeadingDecorated";

interface DishSectionProps {
  category: string;
  items: DishItemProps[];
}

const DishSection: React.FC<DishSectionProps> = ({ category, items }) => {
  return (
    <div className="flex flex-col items-center gap-12 pt-16">
      <HeadingDecorated
        className={`font-forum text-[32px] tracking-[1px] leading-[120%] ${styles.categoryHeader}`}
      >
        {category}
      </HeadingDecorated>
      <div className="flex flex-col gap-8 max-w-[740px]">
        {items.map((dish) => (
          <DishItem
            key={dish.name}
            className="flex flex-row gap-6"
            name={dish.name}
            description={dish.description}
            price={dish.price}
            imageSrc={dish.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default DishSection;
