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
        className={`${styles.card} aspect-3/2 flex-none`}
        mediaType="image"
        imageProps={{
          src: props.imageSrc,
          alt: `${props.name} image}`,
          fill: true,
          sizes: "(max-width: 810px) 100vw, 20vw",
          quality: 75,
        }}
        borderRadius="var(--card-radius)"
      />
      <div className="w-full flex flex-col justify-center gap-1">
        <div
          className={`${styles.mainInfo} flex flex-row gap-4 justify-between font-forum text-[22px] text-text-default tracking-[1px] leading-[120%]`}
        >
          <div
            className={`${styles.dishName} text-center flex-none wrap-anywhere`}
          >
            {props.name}
          </div>
          <div
            className={`${styles.border} w-full border-border-default border-dotted border-b-2 mb-1.5`}
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
