"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image, { ImageProps, StaticImageData } from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";

interface ImageSliderProps {
  imagesSrc: string[] | StaticImageData[];
  imageProps?: Omit<ImageProps, "src" | "alt">;
  className?: string;
}

const ImageSlider = forwardRef<HTMLDivElement, ImageSliderProps>(
  ({ imagesSrc, imageProps, className }, ref) => {
    const [current, setCurrent] = useState<number>(0);
    const leftArrowRef = useRef<HTMLImageElement | null>(null);
    const rightArrowRef = useRef<HTMLImageElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
      if (current !== imagesSrc.length - 1) setCurrent(current + 1);
    };

    const prevSlide = () => {
      if (current !== 0) setCurrent(current - 1);
    };

    const changeArrowState = (side: "left" | "right", visible: boolean) => {
      const ref = side == "left" ? leftArrowRef.current : rightArrowRef.current;
      if (visible) {
        gsap.set(ref, { pointerEvents: "auto" });

        gsap.to(ref, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(ref, { pointerEvents: "none" });

        gsap.to(ref, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };
    const onMouseDownShrink = (ref: HTMLImageElement | null) =>
      gsap.to(ref, {
        scale: 0.9,
        duration: 0.1,
      });

    const onMouseUpUnshrink = (ref: HTMLImageElement | null) =>
      gsap.to(ref, {
        scale: 1,
        duration: 0.1,
      });

    useGSAP(() => {
      gsap.to(scrollContainerRef.current, {
        translateX: `-${current * 100}%`,
      });
    }, [current]);

    useEffect(() => {
      changeArrowState("left", current > 0);
      changeArrowState("right", current < imagesSrc.length - 1);
    }, [current, imagesSrc.length]);

    return (
      <div
        ref={ref}
        className={`rounded-xl overflow-hidden relative ${className}`}
      >
        <div ref={scrollContainerRef} className="flex flex-row w-full h-full ">
          {imagesSrc.map((item, index) => (
            <div key={index} className="relative w-full h-full shrink-0">
              <Image
                src={item}
                fill={true}
                className={`object-cover ${imageProps?.className || ""}`}
                data-preload={index === 0 && "true"}
                alt={`slider image ${index}`}
                {...imageProps}
              />
            </div>
          ))}
        </div>
        <div
          className="absolute top-0 left-0 h-full w-1/4 z-10 flex items-center justify-start group"
          onClick={prevSlide}
          onMouseDown={() => onMouseDownShrink(leftArrowRef.current)}
          onMouseUp={() => onMouseUpUnshrink(leftArrowRef.current)}
          onMouseOut={() => onMouseUpUnshrink(leftArrowRef.current)}
        >
          <Image
            ref={leftArrowRef}
            src="/shared/ImageSlider/arrowLeft.svg"
            width={35}
            height={35}
            className="absolute opacity-0 pointer-events-none -translate-y-1/2 top-1/2 left-5 aspect-square cursor-pointer bg-background-muted rounded-full h-9 w-auto"
            draggable={false}
            data-preload="true"
            alt="left arrow slider button icon"
          />
        </div>
        <div
          className="absolute top-0 right-0 h-full w-1/4 z-10 flex items-center justify-start group"
          onClick={nextSlide}
          onMouseDown={() => onMouseDownShrink(rightArrowRef.current)}
          onMouseUp={() => onMouseUpUnshrink(rightArrowRef.current)}
          onMouseOut={() => onMouseUpUnshrink(rightArrowRef.current)}
        >
          <Image
            ref={rightArrowRef}
            src="/shared/ImageSlider/arrowRight.svg"
            width={35}
            height={35}
            className="absolute opacity-0 pointer-events-none -translate-y-1/2 top-1/2 right-5 aspect-square cursor-pointer bg-background-muted rounded-full h-9 w-auto"
            draggable={false}
            data-preload="true"
            alt="right arrow slider button icon"
          />
        </div>
      </div>
    );
  }
);

export default ImageSlider;
