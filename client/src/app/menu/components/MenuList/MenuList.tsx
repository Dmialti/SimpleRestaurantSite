"use client";

import React, { useRef } from "react";
import Button from "../../../../shared/components/Button/Button";
import { GetMenuQuery } from "../../../../graphql/codegen/generated/graphql";
import { useStaggeredReveal } from "../../../../shared/hooks/useStaggeredReveal.hook";
import { useBasePageLayoutAnimationContext } from "../../../../shared/hooks/useBasePageLayoutAnimationContext";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import styles from "./MenuList.module.css";
import DishSection from "../DishSection/DishSection";

interface MenuListProps {
  categories: GetMenuQuery["getMenu"];
}

const MenuList: React.FC<MenuListProps> = ({ categories }) => {
  const { isContentAnimationDone } = useBasePageLayoutAnimationContext();

  const lenis = useLenis();

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const scrollToCategory = (id: string) => {
    const target = sectionRefs.current[id];

    if (target && lenis) {
      lenis.scrollTo(target, {
        offset: -100,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <div
        className={`flex justify-center font-satoshi z-9999 sticky top-0 py-4 ${styles.fastTravel}`}
      >
        <div
          className={`w-fit flex gap-1 flex-wrap justify-center px-4 py-2 ${styles.buttonWrapper}`}
        >
          {categories.map((item) => (
            <Button
              key={item.id}
              variant="border"
              className={`px-3 py-1 text-[12px] tracking-[1px] leading-[190%] ${styles.fastTravelButton}`}
              onClick={() => scrollToCategory(String(item.id))}
            >
              {item.name.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      <div ref={staggeredDishContainerRef}>
        {categories.map((item) => (
          <div
            key={item.id}
            ref={(el) => {
              sectionRefs.current[item.id] = el;
            }}
            className="scroll-mt-30"
          >
            <DishSection
              category={item.name}
              dishes={item.dishes}
              staggeredDishAddToRefs={staggeredDishAddToRefs}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
