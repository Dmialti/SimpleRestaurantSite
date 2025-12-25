import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

type BaseCardProps = React.HTMLAttributes<HTMLDivElement> & {
  mediaSrc: string;
  borderRadius?: string;
  isAnimated?: boolean;
  isHoverContext?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  changeHover?: boolean;
};

export type CardBaseProps =
  | ({ mediaType: "image" } & BaseCardProps)
  | ({ mediaType: "video" } & BaseCardProps);

const CardBase = React.forwardRef<HTMLDivElement, CardBaseProps>(
  (
    {
      mediaType,
      mediaSrc,
      borderRadius = "1rem",
      isAnimated,
      onHoverChange,
      isHovered,
      setIsHovered,
      changeHover = true,
      className,
      children,
      style,
      onClick,
      ...rest
    },
    ref
  ) => {
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

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (changeHover) setIsHovered(true);
      rest.onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (changeHover) setIsHovered(false);
      rest.onMouseLeave?.(e);
    };

    return (
      <div
        ref={ref}
        className={`overflow-hidden ${className || ""}`}
        style={{ borderRadius: borderRadius, ...style }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
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
            data-preload="true"
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
            data-preload="true"
          />
        )}
        {children}
      </div>
    );
  }
);

export default CardBase;
