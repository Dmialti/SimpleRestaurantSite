import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

interface ImageSliderProps {
  imagesSrc: string[];
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ imagesSrc, className }) => {
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
    <div className={`rounded-xl overflow-hidden relative ${className}`}>
      <div ref={scrollContainerRef} className="flex flex-row w-full h-full">
        {imagesSrc.map((item, index) => (
          <img
            key={index}
            src={item}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      <img
        ref={leftArrowRef}
        src="/shared/ImageSlider/arrowLeft.svg"
        className="absolute opacity-0 pointer-events-none -translate-y-1/2 top-1/2 left-3 aspect-square bg-background-muted rounded-full"
        onClick={prevSlide}
        draggable={false}
        onMouseDown={() => onMouseDownShrink(leftArrowRef.current)}
        onMouseUp={() => onMouseUpUnshrink(leftArrowRef.current)}
        onMouseOut={() => onMouseUpUnshrink(leftArrowRef.current)}
      />
      <img
        ref={rightArrowRef}
        src="/shared/ImageSlider/arrowRight.svg"
        className="absolute -translate-y-1/2 top-1/2 right-3 aspect-square bg-background-muted rounded-full"
        onClick={nextSlide}
        draggable={false}
        onMouseDown={() => onMouseDownShrink(rightArrowRef.current)}
        onMouseUp={() => onMouseUpUnshrink(rightArrowRef.current)}
        onMouseOut={() => onMouseUpUnshrink(rightArrowRef.current)}
      />
    </div>
  );
};

export default ImageSlider;
