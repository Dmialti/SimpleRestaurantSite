import React from "react";
import BottomGradient from "../BottomGradient/BottomGradient";
import Card from "../Card/Card";
import HeroHeading from "../HeroHeading/HeroHeading";

export interface HeroCardProps {
  heading?: string[];
  mediaType: "video" | "image";
  mediaSrc: string;
  className?: string;
  children?: React.ReactNode;
}

const HeroCard: React.FC<HeroCardProps> = ({
  heading,
  mediaType,
  mediaSrc,
  className,
  children,
}) => {
  return (
    <Card
      className={`h-full w-full relative ${className}`}
      mediaType={mediaType}
      mediaSrc={mediaSrc}
    >
      <BottomGradient />
      <HeroHeading className="text-nowrap absolute bottom-0 left-0 self pb-14 pl-16.5">
        {heading?.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </HeroHeading>
      {children}
    </Card>
  );
};

export default HeroCard;
