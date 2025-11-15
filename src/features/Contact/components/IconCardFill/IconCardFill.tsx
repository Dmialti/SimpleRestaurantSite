import React, { useRef } from "react";
import useHovered from "../../../shared/context/CardContext/hooks/useHovered";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface IconCardFillProps {
  iconSrc: string;
  className?: string;
}

const IconCardFill: React.FC<IconCardFillProps> = ({ iconSrc, className }) => {
  const { isHovered } = useHovered();
  const coverRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(coverRef.current, {
      opacity: isHovered ? 0.6 : 0,
      ease: "power1.inOut",
      duration: 0.2,
    });
  }, [isHovered]);

  return (
    <div
      ref={coverRef}
      className={`w-full h-full flex justify-center items-center absolute opacity-0 top-0 bg-background-default ${className}`}
    >
      <img className="h-[30px] w-[30px]" src={iconSrc} />
    </div>
  );
};

export default IconCardFill;
