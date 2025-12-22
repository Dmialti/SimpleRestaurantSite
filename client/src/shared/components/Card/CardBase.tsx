import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, type ReactNode } from "react";

type BaseCardProps = {
  mediaSrc: string;
  borderRadius?: string;
  isAnimated?: boolean;
  isHoverContext?: boolean;
  onClick?: () => void;
  onHoverChange?: (hovered: boolean) => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  changeHover?: boolean;
  className?: string;
  children?: ReactNode;
};

export type CardBaseProps =
  | ({ mediaType: "image" } & BaseCardProps)
  | ({ mediaType: "video" } & BaseCardProps);

const CardBase: React.FC<CardBaseProps> = ({
  mediaType,
  mediaSrc,
  borderRadius = "1rem",
  isAnimated,
  onClick,
  onHoverChange,
  isHovered,
  setIsHovered,
  changeHover = true,
  className,
  children,
}) => {
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
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
      className={`overflow-hidden ${className}`}
      style={{ borderRadius: borderRadius }}
      onClick={onClick}
      onMouseEnter={changeHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={changeHover ? () => setIsHovered(false) : undefined}
    >
      {mediaType == "image" && (
        <img
          className="h-full w-full object-cover block"
          style={{
            willChange: "transform, filter",
            clipPath: `inset(0 round ${borderRadius})`,
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

export default CardBase;
