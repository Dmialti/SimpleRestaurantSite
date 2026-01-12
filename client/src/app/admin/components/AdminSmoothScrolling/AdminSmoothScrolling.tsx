"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function AdminSmoothScrolling({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current.firstElementChild as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationId);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className={`h-full w-full overflow-y-auto ${className}`}
    >
      <div>{children}</div>
    </div>
  );
}
