import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggerConfig {
  stagger?: number;
  duration?: number;
  start?: string;
  baseX?: number;
  baseY?: number;
  baseScale?: number;
  onComplete?: () => void;
  onProgress?: () => void;
  progressThreshold?: number;
  enable?: boolean;
}

export const useStaggeredReveal = ({
  stagger = 0,
  duration = 1,
  start = "top 100%",
  baseX = 0,
  baseY = 0,
  baseScale = 1,
  onComplete,
  onProgress,
  progressThreshold = 0,
  enable = true,
}: StaggerConfig = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);

  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  }, []);

  useGSAP(
    () => {
      if (!enable || itemsRef.current.length === 0) return;

      itemsRef.current.sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      );

      gsap.set(itemsRef.current, { autoAlpha: 0 });

      const initAnimation = () => {
        ScrollTrigger.refresh();

        let hasTriggeredProgress = false;

        gsap.fromTo(
          itemsRef.current,
          {
            autoAlpha: 0,
            x: (_, el) => (el.dataset.x ? Number(el.dataset.x) : baseX),
            y: (_, el) => (el.dataset.y ? Number(el.dataset.y) : baseY),
            scale: (_, el) =>
              el.dataset.scale ? Number(el.dataset.scale) : baseScale,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: duration,
            ease: "power3.out",
            stagger: stagger,
            onComplete: onComplete,
            onStart: () => {
              hasTriggeredProgress = false;
            },
            onUpdate: function () {
              if (
                onProgress &&
                !hasTriggeredProgress &&
                this.progress() >= progressThreshold
              ) {
                hasTriggeredProgress = true;
                onProgress();
              }
            },
            onReverseComplete: () => {
              hasTriggeredProgress = false;
            },
            scrollTrigger: {
              trigger: containerRef.current,
              start: start,
              toggleActions: "play none none reverse",
            },
          }
        );
      };

      document.fonts.ready.then(() => {
        setTimeout(() => {
          if (document.readyState !== "complete") {
            window.addEventListener("load", initAnimation, { once: true });
          } else {
            initAnimation();
          }
        }, 50);
      });
    },
    { scope: containerRef, dependencies: [enable] }
  );

  return { containerRef, addToRefs };
};
