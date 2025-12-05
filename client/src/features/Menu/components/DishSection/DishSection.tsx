import React from "react";
import DishItem from "../DishItem/DishItem";
import styles from "./DishSection.module.css";
import HeadingDecorated from "../../../shared/components/HeadingDecorated/HeadingDecorated";
import {
  useFragment,
  type FragmentType,
} from "../../../../graphql/codegen/generated";
import { DISH_FRAGMENT } from "../../../../graphql/menu/fragments/dish.fragment";

interface DishSectionProps {
  category: string;
  dishes: readonly FragmentType<typeof DISH_FRAGMENT>[];
}

const DishSection: React.FC<DishSectionProps> = ({
  category,
  dishes: dishesRef,
}) => {
  const dishes = useFragment(DISH_FRAGMENT, dishesRef);
  return (
    <div className="flex flex-col items-center gap-12 pt-16">
      <HeadingDecorated
        className={`font-forum text-[32px] tracking-[1px] leading-[120%] ${styles.categoryHeader}`}
      >
        {category.toUpperCase()}
      </HeadingDecorated>
      <div className="flex flex-col gap-8 max-w-[740px]">
        {dishes.map((dish) => (
          <DishItem key={dish.id} {...dish} className="flex flex-row gap-6" />
        ))}
      </div>
    </div>
  );
};

export default DishSection;
