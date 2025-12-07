import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import useHovered from "../../../../shared/hooks/useHovered.hook";

interface RollingAnimationProps {
  direction?: "horizontal" | "vertical";
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const RollingAnimation: React.FC<RollingAnimationProps> = ({
  direction = "vertical",
  children,
  className,
  style,
}) => {
  const parent = useRef<HTMLDivElement>(null);
  const animationContainer = useRef<HTMLDivElement>(null);
  const { isHovered } = useHovered();
  const tl = useRef(gsap.timeline({ paused: true })).current;

  useGSAP(() => {
    if (direction == "vertical") {
      tl.to(animationContainer.current, {
        yPercent: -50,
        duration: 0.2,
        ease: "power1.inOut",
      });
    } else {
      tl.to(animationContainer.current, {
        xPercent: -100,
        duration: 0.2,
        ease: "power1.inOut",
      });
    }
  }, []);

  useGSAP(() => {
    if (isHovered) tl.play();
    else tl.reverse();
  }, [isHovered]);

  useEffect(() => {}, [isHovered]);
  return (
    <div
      ref={parent}
      className={
        `overflow-hidden leading-none h-lh text-text-default ` + className
      }
      style={style}
    >
      <div
        ref={animationContainer}
        className={`flex ${direction == "vertical" ? "flex-col" : "flex-row"}`}
      >
        <div className="flex-none">{children}</div>
        <div className="flex-none">{children}</div>
      </div>
    </div>
  );
};

gsap.registerPlugin();

export default RollingAnimation;
