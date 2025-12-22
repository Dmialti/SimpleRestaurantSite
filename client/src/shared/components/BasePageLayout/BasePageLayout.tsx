import React, { type ReactNode } from "react";
import styles from "./BasePageLayout.module.css";
import HeroCard, { type HeroCardProps } from "../HeroCard/HeroCard";

interface BasePageLayoutProps extends HeroCardProps {
  isScreenHeight: boolean;
  className?: string;
  children?: ReactNode;
}

const BasePageLayout: React.FC<BasePageLayoutProps> = ({
  heading,
  mediaType,
  mediaSrc,
  isScreenHeight,
  children,
  className,
}) => {
  return (
    <div
      className={`${styles.mainSection} w-full h-auto box-border gap-4 relative px-6`}
    >
      <div className={`${styles.heroSection} top-0 py-6 h-screen sticky`}>
        <HeroCard
          heading={heading}
          className={`relative h-full`}
          mediaType={mediaType}
          mediaSrc={mediaSrc}
        />
      </div>
      <div
        className={`${
          styles.contentSection + " " + (isScreenHeight && "h-screen")
        } overflow-hidden min-w-0 py-6`}
      >
        <div
          className={`${className} border border-border-default h-full rounded-2xl`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BasePageLayout;
