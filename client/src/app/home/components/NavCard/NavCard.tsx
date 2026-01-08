"use client";

import styles from "./NavCard.module.css";
import CardContextProvider from "@/context/CardContext/CardContextProvider";
import CardWithContextHover, {
  CardWithContextHoverProps,
} from "@/shared/components/Card/CardIsHoveredContext";
import CornerMenu from "../CornerMenu/CornerMenu";
import LinkIconAnimated from "../LinkIcon/LinkIconAnimated";
import RollingAnimation from "../RollingText/RollingText";
import { useTransitionRouter } from "next-transition-router";

type NavCardProps = {
  cardWithContextHoverProps: CardWithContextHoverProps;
  link: string;
  title: string;
  addRef?: (el: HTMLDivElement | null) => void;
};

export const NavCard: React.FC<NavCardProps> = ({
  cardWithContextHoverProps,
  link,
  title,
  addRef,
}) => {
  const router = useTransitionRouter();

  return (
    <div className="flex-1 min-h-0 relative w-full">
      <CardContextProvider>
        <CardWithContextHover
          className={`${styles.cardContainer} w-full h-full cursor-pointer invisible rounded-2xl`}
          isAnimated={true}
          onClick={() => router.push(link)}
          ref={addRef}
          {...cardWithContextHoverProps}
        >
          <CornerMenu
            className={`${styles.cornerMenu} pointer-events-none text-white pt-3 pl-6 gap-3 `}
          >
            <RollingAnimation className="will-change-transform backface-hidden">
              {title}
            </RollingAnimation>
            <LinkIconAnimated
              className={`${styles.linkIcon} block p-2.5 will-change-transform backface-hidden`}
              imageSrc="/StartingPageMaterials/icons/arrowLogo.svg"
            />
          </CornerMenu>
        </CardWithContextHover>
      </CardContextProvider>
    </div>
  );
};
