import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, type ReactNode } from "react";
import useHovered from "../../context/CardContext/hooks/useHovered";

type BaseCardProps = {
  mediaSrc: string;
  isAnimated?: boolean;
  onClick?: () => void;
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
  children?: ReactNode;
};

export type CardProps =
  | ({ mediaType: "image" } & BaseCardProps)
  | ({ mediaType: "video" } & BaseCardProps);

const Card: React.FC<CardProps> = ({
  mediaType,
  mediaSrc,
  isAnimated,
  onClick,
  onHoverChange,
  className,
  children,
}) => {
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const { isHovered, setIsHovered } = useHovered();
  const tl = useRef(gsap.timeline({ paused: true })).current;

  useGSAP(() => {
    if (isAnimated) {
      tl.fromTo(
        mediaRef.current,
        {
          scale: 1,
          filter: "brightness(100%)",
        },
        {
          scale: 1.05,
          filter: "brightness(130%)",
          ease: "power1.inOut",
          duration: 0.2,
        }
      );
    }
  }, []);

  useGSAP(() => {
    if (isHovered) tl.play();
    else tl.reverse();

    onHoverChange?.(isHovered);
  }, [isHovered]);

  return (
    <div
      className={`${className} h-full w-full overflow-hidden rounded-2xl`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {mediaType == "image" && (
        <img
          className="h-full w-full object-cover block"
          style={{
            willChange: "transform, filter",
            clipPath: "inset(0 round 1rem)",
          }}
          src={mediaSrc}
          alt=""
          ref={mediaRef as React.RefObject<HTMLImageElement>}
        />
      )}
      {mediaType == "video" && (
        <video
          className="h-full w-full object-cover block"
          style={{
            willChange: "transform, filter",
            clipPath: "inset(0 round 1rem)",
          }}
          autoPlay
          loop
          muted
          src={mediaSrc}
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
        />
      )}
      {children}
    </div>
  );
};

export default Card;
