import React from "react";
import Card from "../../../shared/components/Card/Card";

interface DishItemProps {
  name: string;
  description?: string;
  price: number;
  imageSrc: string;
  className?: string;
}

const DishItem: React.FC<DishItemProps> = (props) => {
  return (
    <div className={`${props.className}`}>
      <Card
        className="w-[150px] h-[100px] flex-none"
        mediaType="image"
        mediaSrc={props.imageSrc}
      />
      <div className=" flex flex-col justify-center gap-1">
        <div className=" flex flex-row gap-4 justify-between font-forum text-[22px] text-text-default tracking-[1px] leading-[120%]">
          <div className="flex-none">{props.name}</div>
          <div className="w-full border-border-default border-dotted border-b-2 mb-[6px]"></div>
          <div className="flex-none">${props.price}</div>
        </div>
        <div className="font-satoshi text-[14px] text-text-muted tracking-[0px] leading-[150%]">
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default DishItem;
