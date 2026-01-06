import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
type CommonProps = React.HTMLAttributes<HTMLDivElement> & {
  borderRadius?: string;
  isAnimated?: boolean;
  isHoverContext?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  changeHover?: boolean;
};

type ImageCardProps = CommonProps & {
  mediaType: "image";
  imageProps: ImageProps;
  mediaSrc?: never;
};

type VideoCardProps = CommonProps & {
  mediaType: "video";
  mediaSrc: string;
  imageProps?: never;
};

export type CardBaseProps = ImageCardProps | VideoCardProps;

const CardBase = React.forwardRef<HTMLDivElement, CardBaseProps>(
  (props, ref) => {
    const {
      mediaType,
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
      imageProps: _ignoredImageProps,
      mediaSrc: _ignoredMediaSrc,
      ...divProps
    } = props;

    const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
    const tl = useRef(gsap.timeline({ paused: true })).current;

    useGSAP(() => {
      if (props.isAnimated) {
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
      props.onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (changeHover) setIsHovered(false);
      props.onMouseLeave?.(e);
    };

    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${className || ""}`}
        style={{ borderRadius: borderRadius, ...style }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...divProps}
      >
        {mediaType === "image" ? (
          <Image
            ref={mediaRef as React.RefObject<HTMLImageElement>}
            className="object-cover block will-change-transform backface-hidden"
            style={{
              willChange: "transform, filter",
              clipPath: `inset(0 round ${borderRadius})`,
            }}
            {...props.imageProps}
          />
        ) : (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={props.mediaSrc}
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
