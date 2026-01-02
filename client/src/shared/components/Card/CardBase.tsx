import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import {
  AdaptiveMap,
  SupportedImageFormat,
  SupportedVideoFormat,
} from "../../hooks/useAdaptiveSources.hook";
import { AdaptiveImage } from "../Adaptive/AdaptiveImage/AdaptiveImage";
import { AdaptiveVideo } from "../Adaptive/AdaptiveVideo/AdaptiveVideo";

type BaseCardProps = React.HTMLAttributes<HTMLDivElement> & {
  mediaSrc: string;
  adaptiveSrc?: AdaptiveMap;
  borderRadius?: string;
  isAnimated?: boolean;
  isHoverContext?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  changeHover?: boolean;
};

export type CardBaseProps =
  | ({
      mediaType: "image";
      formats?: SupportedImageFormat[];
    } & BaseCardProps)
  | ({
      mediaType: "video";
      formats?: SupportedVideoFormat[];
    } & BaseCardProps);

const CardBase = React.forwardRef<HTMLDivElement, CardBaseProps>(
  (
    {
      mediaType,
      mediaSrc,
      formats,
      adaptiveSrc,
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
        {mediaType === "image" ? (
          <AdaptiveImage
            ref={mediaRef as React.RefObject<HTMLImageElement>}
            formats={formats}
            mediaSrc={mediaSrc}
            adaptiveSrc={adaptiveSrc}
            className="h-full w-full object-cover block"
            style={{
              willChange: "transform, filter",
              clipPath: `inset(0 round ${borderRadius})`,
            }}
          />
        ) : (
          <AdaptiveVideo
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            formats={formats}
            mediaSrc={mediaSrc}
            adaptiveSrc={adaptiveSrc}
            className="h-full w-full object-cover block"
            style={{
              willChange: "transform, filter",
              clipPath: "inset(0 round 1rem)",
            }}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        {children}
      </div>
    );
  }
);

export default CardBase;
