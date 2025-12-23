import React from "react";
import Button from "../../../../shared/components/Button/Button";
import DishSection from "../DishSection/DishSection";
import { GetMenuQuery } from "../../../../graphql/codegen/generated/graphql";
import { useStaggeredReveal } from "../../../../shared/hooks/useStaggeredReveal.hook";
import { useBasePageLayoutAnimationContext } from "../../../../shared/hooks/useBasePageLayoutAnimationContext";
import gsap from "gsap";

interface MenuListProps {
  categories: GetMenuQuery["getMenu"];
}

const MenuList: React.FC<MenuListProps> = ({ categories }) => {
  const { isContentAnimationDone } = useBasePageLayoutAnimationContext();

  const {
    containerRef: staggeredDishContainerRef,
    addToRefs: staggeredDishAddToRefs,
  } = useStaggeredReveal({
    x: -50,
    duration: 0.5,
    progressThreshold: 0.3,
    triggerByElement: true,
    start: "top 90%",
    toggleActions: "play reverse play reverse",
    end: "bottom 10%",
    ease: gsap.parseEase("sine.inOut"),
    enable: isContentAnimationDone,
    stagger: 0.05,
  });

  return (
    <div>
      <div className="flex gap-1 justify-center font-satoshi flex-wrap">
        {categories.map((item) => (
          <Button
            key={item.id}
            variant="border"
            className="px-3 py-1 text-[12px] tracking-[1px] leading-[190%]"
          >
            {item.name.toUpperCase()}
          </Button>
        ))}
      </div>
      <div ref={staggeredDishContainerRef}>
        {categories.map((item) => (
          <DishSection
            key={item.id}
            category={item.name}
            dishes={item.dishes}
            staggeredDishAddToRefs={staggeredDishAddToRefs}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
