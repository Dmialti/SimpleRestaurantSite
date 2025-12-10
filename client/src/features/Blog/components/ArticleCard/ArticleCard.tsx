import React from "react";
import HeaderLeftDecor from "../../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";
import styles from "./ArticleCard.module.css";
import { useNavigate } from "react-router-dom";
import useHovered from "../../../../shared/hooks/useHovered.hook";
import CardWithContextHover from "../../../../shared/components/Card/CardIsHoveredContext";

interface ArticleCardProps {
  id: number;
  date: string;
  header: string;
  description: string;
  imageSrc: string;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = (props) => {
  const { setIsHovered } = useHovered();
  const navigate = useNavigate();

  const openArticle = () => {
    navigate(`/article/${props.id}`);
  };

  return (
    <div
      className={`flex flex-row gap-12 items-center select-none ${styles.articleContainer} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={openArticle}
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

export default ArticleCard;
