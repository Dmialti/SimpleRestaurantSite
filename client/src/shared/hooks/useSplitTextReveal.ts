import { useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SplitTextConfig {
  type?: "chars" | "words" | "lines" | "chars, words";
  stagger?: number;
  duration?: number;
  y?: number;
  start?: string;
  onComplete?: () => void;
  onProgress?: () => void;
  progressThreshold?: number;
  enable?: boolean;
  ease?: gsap.EaseFunction;
  manual?: boolean;
}

export const useSplitTextReveal = ({
  type = "chars",
  stagger = 0,
  duration = 1,
  y = 0,
  start = "top 100%",
  onComplete,
  onProgress,
  progressThreshold = 0,
  enable = true,
  ease = gsap.parseEase("sine.inOut"),
  manual = false,
}: SplitTextConfig = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);

  const [animation, setAnimation] = useState<gsap.core.Timeline | null>(null);

  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  }, []);

  useGSAP(
    () => {
      if (!enable || itemsRef.current.length === 0) return;

      const splits: SplitText[] = [];

      const initAnimation = () => {
        splits.forEach((s) => s.revert());
        splits.length = 0;

        let hasTriggeredProgress = false;

        const tl = gsap.timeline({
          paused: manual,
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
          scrollTrigger: manual
            ? undefined
            : {
                trigger: containerRef.current,
                start: start,
                toggleActions: "play none none reverse",
              },
        });

        itemsRef.current.forEach((el) => {
          const split = new SplitText(el, { type: type });
          splits.push(split);

          const targetChars: HTMLElement[] = [];

          if (type.includes("chars"))
            targetChars.push(...(split.chars as HTMLElement[]));
          else if (type.includes("words"))
            targetChars.push(...(split.words as HTMLElement[]));
          else targetChars.push(...(split.lines as HTMLElement[]));

          gsap.set(targetChars, { autoAlpha: 0, y: y });

          gsap.set(el, { autoAlpha: 1 });

          tl.to(
            targetChars,
            {
              autoAlpha: 1,
              y: 0,
              duration: duration,
              ease: ease,
              stagger: stagger,
            },
            0
          );
        });
        if (manual) {
          setAnimation(tl);
        }
      };

      document.fonts.ready.then(() => {
        initAnimation();
      });

      return () => {
        splits.forEach((split) => split.revert());
      };
    },
    { scope: containerRef, dependencies: [manual, enable] }
  );

  return { containerRef, addToRefs, animation };
};
