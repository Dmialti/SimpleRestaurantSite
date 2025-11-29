import React from "react";
import CardWithContextHover from "../../../shared/components/Card/CardIsHoveredContext";
import HeaderLeftDecor from "../HeaderLeftDecor/HeaderLeftDecor";
import useHovered from "../../../shared/context/CardContext/hooks/useHovered";
import styles from "./ArticleCard.module.css";

interface ArticleProps {
  date: string;
  header: string;
  description: string;
  imageSrc: string;
  className?: string;
}

const Article: React.FC<ArticleProps> = (props) => {
  const { setIsHovered } = useHovered();
  return (
    <div
      className={`flex flex-row gap-12 items-center select-none ${styles.articleContainer}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardWithContextHover
        className={`aspect-[1.33333/1] w-[40%] min-w-[200px] ${styles.card}`}
        mediaType="image"
        mediaSrc={props.imageSrc}
        isAnimated={true}
        changeHover={false}
      />
      <div className="flex flex-col gap-2">
        <HeaderLeftDecor className="font-satoshi text-text-default text-[12px] leading-[190%] tracking-[1px]">
          {props.date}
        </HeaderLeftDecor>
        <div className="font-forum text-text-default text-[24px] leading-[120%] tracking-[1px] uppercase">
          {props.header}
        </div>
        <div className="font-satoshi text-text-muted text-[16px] leading-[180%] tracking-[0px] ">
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default Article;
