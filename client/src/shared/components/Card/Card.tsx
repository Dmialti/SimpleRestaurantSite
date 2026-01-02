import { useState, forwardRef } from "react";
import CardBase, { CardBaseProps } from "./CardBase";

type DistributiveOmit<T, K extends keyof T | string> = T extends T
  ? Omit<T, K>
  : never;

type CardProps = DistributiveOmit<CardBaseProps, "isHovered" | "setIsHovered">;

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <CardBase
      {...props}
      ref={ref}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
    />
  );
});

export default Card;
