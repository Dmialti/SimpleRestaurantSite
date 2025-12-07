import React from "react";
import CardBase from "./CardBase";
import useHovered from "../../../context/CardContext/hooks/useHovered";

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
