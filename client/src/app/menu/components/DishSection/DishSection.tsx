import React from "react";
import styles from "./DishSection.module.css";
import {
  useFragment,
  type FragmentType,
} from "../../../../graphql/codegen/generated";
import { DISH_FRAGMENT } from "../../../../graphql/menu/fragments/dish.fragment";
import HeadingDecorated from "../../../../shared/components/HeadingDecorated/HeadingDecorated";
import { useStaggeredReveal } from "../../../../shared/hooks/useStaggeredReveal.hook";
import gsap from "gsap";
import { useBasePageLayoutAnimationContext } from "../../../../shared/hooks/useBasePageLayoutAnimationContext";
import DishItem from "../DishItem/DishItem";

interface DishSectionProps {
  category: string;
  dishes: readonly FragmentType<typeof DISH_FRAGMENT>[];
  staggeredDishAddToRefs: (el: HTMLElement | null) => void;
}

const DishSection: React.FC<DishSectionProps> = ({
  category,
  dishes: dishesRef,
  staggeredDishAddToRefs,
}) => {
  const { isContentAnimationDone } = useBasePageLayoutAnimationContext();

  const {
    containerRef: staggeredHeaderContainerRef,
    addToRefs: staggeredHeaderAddToRefs,
  } = useStaggeredReveal({
    y: -50,
    duration: 0.5,
    progressThreshold: 0.3,
    triggerByElement: true,
    start: "top 90%",
    toggleActions: "play reverse play reverse",
    end: "bottom 10%",
    ease: gsap.parseEase("sine.inOut"),
    enable: isContentAnimationDone,
  });

  const dishes = useFragment(DISH_FRAGMENT, dishesRef);
  return (
    <div
      ref={staggeredHeaderContainerRef}
      className={`flex flex-col items-center gap-12 pt-10 ${styles.dishSectionContainer}`}
    >
      <HeadingDecorated
        ref={staggeredHeaderAddToRefs}
        className={`font-forum text-[32px] tracking-[1px] leading-[120%] ${styles.categoryHeader} invisible`}
      >
        {category.toUpperCase()}
      </HeadingDecorated>
      <div className="flex flex-col gap-8 max-w-[740px]">
        {dishes.map((dish) => (
          <DishItem
            key={dish.id}
            ref={staggeredDishAddToRefs}
            {...dish}
            className="flex flex-row gap-6 invisible"
          />
        ))}
      </div>
    </div>
  );
};

export default DishSection;
