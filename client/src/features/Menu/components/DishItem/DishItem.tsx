import { forwardRef } from "react";
import styles from "./DishItem.module.css";
import type { DishItemFieldsFragment } from "../../../../graphql/codegen/generated/graphql";
import Card from "../../../../shared/components/Card/Card";

export interface DishItemProps extends DishItemFieldsFragment {
  className?: string;
}

const DishItem = forwardRef<HTMLDivElement, DishItemProps>((props, ref) => {
  return (
    <div ref={ref} className={`${styles.dishContainer} ${props.className}`}>
      <Card
        className={`${styles.card} w-[150px] h-[100px] flex-none`}
        mediaType="image"
        mediaSrc={props.imageSrc}
        borderRadius="var(--card-radius)"
        alt={`${props.name} image`}
      />
      <div className=" flex flex-col justify-center gap-1">
        <div
          className={`${styles.mainInfo} flex flex-row gap-4 justify-between font-forum text-[22px] text-text-default tracking-[1px] leading-[120%]`}
        >
          <div
            className={`${styles.dishName} text-center flex-none wrap-anywhere`}
          >
            {props.name}
          </div>
          <div
            className={`${styles.border} w-full border-border-default border-dotted border-b-2 mb-[6px]`}
          ></div>
          <div className="flex-none">${props.price}</div>
        </div>
        <div className="font-satoshi text-[14px] text-text-muted tracking-[0px] leading-[150%]">
          {props.description}
        </div>
      </div>
    </div>
  );
});

export default DishItem;
