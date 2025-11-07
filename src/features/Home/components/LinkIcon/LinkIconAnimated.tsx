import React from "react";
import RollingAnimation from "../RollingText/RollingText";

interface LinkIconAnimatedProps {
  className?: string;
  imageSrc: string;
  imageHeight?: number;
  imageWidth?: number;
}

const LinkIconAnimated: React.FC<LinkIconAnimatedProps> = ({
  className,
  imageSrc,
  imageHeight = 1,
  imageWidth = 1,
}) => {
  return (
    <a
      href="/"
      className={`border-border-default hover:bg-background-muted p-2.5 border rounded-full transition duration-500 box-border ${className}`}
    >
      <RollingAnimation
        direction="horizontal"
        style={{ width: `${imageWidth}rem` }}
      >
        <img
          src={imageSrc}
          style={{ height: `${imageHeight}rem`, width: `${imageWidth}rem` }}
        />
      </RollingAnimation>
    </a>
  );
};

export default LinkIconAnimated;
