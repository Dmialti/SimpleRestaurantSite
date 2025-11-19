import React, { useState } from "react";
import CardBase from "./CardBase";

type CardProps = Omit<
  React.ComponentProps<typeof CardBase>,
  "isHovered" | "setIsHovered"
>;

const Card: React.FC<CardProps> = (props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <CardBase {...props} isHovered={isHovered} setIsHovered={setIsHovered} />
  );
};

export default Card;
