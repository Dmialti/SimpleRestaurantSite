import { forwardRef } from "react";
import CardBase, { CardBaseProps } from "./CardBase";
import useHovered from "../../hooks/useHovered.hook";

type DistributiveOmit<T, K extends keyof T | string> = T extends T
  ? Omit<T, K>
  : never;

export type CardWithContextHoverProps = DistributiveOmit<
  CardBaseProps,
  "isHovered" | "setIsHovered"
>;

const CardWithContextHover = forwardRef<
  HTMLDivElement,
  CardWithContextHoverProps
>((props, ref) => {
  const { isHovered, setIsHovered } = useHovered();

  return (
    <CardBase
      {...props}
      ref={ref}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
    />
  );
});

export default CardWithContextHover;
