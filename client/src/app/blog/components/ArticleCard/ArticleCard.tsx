import { forwardRef } from "react";
import HeaderLeftDecor from "../../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";
import styles from "./ArticleCard.module.css";
import useHovered from "../../../../shared/hooks/useHovered.hook";
import CardWithContextHover, {
  CardWithContextHoverProps,
} from "../../../../shared/components/Card/CardIsHoveredContext";
import Link from "next/link";

type ImageCardProps = Extract<
  CardWithContextHoverProps,
  { mediaType: "image" }
>;

type ArticleCardProps = {
  id: number;
  date: string;
  header: string;
  description: string;
  className?: string;
  cardProps: Omit<ImageCardProps, "mediaType" | "isHovered" | "setIsHovered">;
};

const ArticleCard = forwardRef<HTMLAnchorElement, ArticleCardProps>(
  ({ id, date, header, description, className, cardProps }, ref) => {
    const { setIsHovered } = useHovered();

    return (
      <Link
        ref={ref}
        className={`flex flex-row gap-12 items-center select-none cursor-pointer min-w-0 ${styles.articleContainer} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        href={`/blog/${id}`}
      >
        <CardWithContextHover
          className={`aspect-[1.33333/1] shrink-0 w-[40%] min-w-50 ${styles.card}`}
          mediaType="image"
          isAnimated={true}
          changeHover={false}
          {...cardProps}
        />
        <div className="flex flex-col gap-2 flex-1 min-w-0 wrap-anywhere">
          <HeaderLeftDecor className="font-satoshi text-text-default text-[12px] leading-[190%] tracking-[1px]">
            {date}
          </HeaderLeftDecor>
          <div
            className={`font-forum text-text-default text-[24px] leading-[120%] tracking-[1px] uppercase ${styles.header}`}
          >
            {header}
          </div>
          <div className="font-satoshi text-text-muted text-[16px] leading-[180%] tracking-[0px] ">
            {description}
          </div>
        </div>
      </Link>
    );
  }
);
export default ArticleCard;
