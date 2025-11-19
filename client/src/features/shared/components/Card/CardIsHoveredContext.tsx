import React from "react";
import useHovered from "../../context/CardContext/hooks/useHovered";
import CardBase from "./CardBase";

type CardWithContextHoverProps = Omit<
  React.ComponentProps<typeof CardBase>,
  "isHovered" | "setIsHovered"
>;

const CardWithContextHover: React.FC<CardWithContextHoverProps> = (props) => {
  const { isHovered, setIsHovered } = useHovered();
  return (
    <CardBase {...props} isHovered={isHovered} setIsHovered={setIsHovered} />
  );
};

export default CardWithContextHover;
