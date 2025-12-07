import React from "react";
import styles from "./HeroHeading.module.css";

interface HeroHeadingProps {
  className?: string;
  children: React.ReactNode;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({ className, children }) => {
  return (
    <div
      className={`${styles.heroHeader} font-forum absolute text-[140px] tracking-[3px] text-text-default ${className}`}
    >
      {children}
    </div>
  );
};

export default HeroHeading;
