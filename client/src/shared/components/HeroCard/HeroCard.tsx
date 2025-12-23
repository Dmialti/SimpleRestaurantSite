import React from "react";
import BottomGradient from "../BottomGradient/BottomGradient";
import Card from "../Card/Card";
import HeroHeading from "../HeroHeading/HeroHeading";
import { useSplitTextReveal } from "../../hooks/useSplitTextReveal.hook";
import gsap from "gsap";
import { mergeRefs } from "../../utils/helpers/mergeRefs.helper";

export interface HeroCardProps {
  heading?: string[];
  enableHeadingAnimation?: boolean;
  mediaType: "video" | "image";
  mediaSrc: string;
  className?: string;
  children?: React.ReactNode;
}

const HeroCard = React.forwardRef<HTMLDivElement, HeroCardProps>(
  (
    {
      heading,
      enableHeadingAnimation = true,
      mediaType,
      mediaSrc,
      className,
      children,
    },
    ref
  ) => {
    const { containerRef, addToRefs } = useSplitTextReveal({
      type: "chars",
      stagger: 0.07,
      duration: 0.3,
      y: 150,
      ease: gsap.parseEase("circ"),
      enable: enableHeadingAnimation,
    });

    return (
      <Card
        ref={mergeRefs(containerRef, ref)}
        className={`h-full w-full relative ${className}`}
        mediaType={mediaType}
        mediaSrc={mediaSrc}
      >
        <BottomGradient />
        <HeroHeading className="text-nowrap absolute bottom-0 left-0 self pb-14 pl-16.5">
          {heading?.map((item) => (
            <div key={item} ref={addToRefs} className="invisible">
              {item}
            </div>
          ))}
        </HeroHeading>
        {children}
      </Card>
    );
  }
);

export default HeroCard;
