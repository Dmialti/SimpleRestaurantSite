import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationSettings {
  x?: number;
  y?: number;
  scale?: number;
  stagger?: number;
  duration?: number;
  start?: string;

  end?: string;
  toggleActions?: string;
  ease?: gsap.EaseFunction;
}

interface StaggerConfig extends AnimationSettings {
  responsive?: Record<string, AnimationSettings>;
  onComplete?: () => void;
  onProgress?: () => void;
  progressThreshold?: number;
  enable?: boolean;
  triggerByElement?: boolean;
}

export const useStaggeredReveal = ({
  x = 0,
  y = 0,
  scale = 1,
  stagger = 0,
  duration = 1,
  start = "top 100%",

  end = "bottom top",
  toggleActions = "play none none reverse",
  responsive = {},
  onComplete,
  onProgress,
  progressThreshold = 0,
  enable = true,
  triggerByElement = false,
  ease = gsap.parseEase("circ"),
}: StaggerConfig = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);

  const responsiveKey = JSON.stringify(responsive);

  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  }, []);

  useGSAP(
    () => {
      if (!enable || itemsRef.current.length === 0) return;

      const mm = gsap.matchMedia();

      itemsRef.current.sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      );

      gsap.set(itemsRef.current, { autoAlpha: 0 });

      const queries = Object.keys(responsive);
      const conditionsMap: Record<string, string> = {};

      queries.forEach((query, index) => {
        conditionsMap[`media_${index}`] = query;
      });
      conditionsMap["all"] = "(min-width: 0px)";

      mm.add(conditionsMap, (context) => {
        const gsConditions = context.conditions as Record<string, boolean>;

        let current: AnimationSettings = {
          x,
          y,
          scale,
          stagger,
          duration,
          start,
          end,
          toggleActions,
        };

        queries.forEach((query, index) => {
          const safeKey = `media_${index}`;
          const isMatching =
            gsConditions?.[safeKey] ?? window.matchMedia(query).matches;

          if (isMatching) {
            current = { ...current, ...responsive[query] };
          }
        });

        ScrollTrigger.refresh();

        if (triggerByElement) {
          itemsRef.current.forEach((el, index) => {
            gsap.fromTo(
              el,
              {
                autoAlpha: 0,
                x: el.dataset.x ? Number(el.dataset.x) : current.x ?? 0,
                y: el.dataset.y ? Number(el.dataset.y) : current.y ?? 0,
                scale: el.dataset.scale
                  ? Number(el.dataset.scale)
                  : current.scale ?? 1,
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: current.duration ?? 1,
                ease: current.ease ?? ease,
                delay: index * (current.stagger ?? 0),
                scrollTrigger: {
                  trigger: el,
                  start: current.start ?? "top 85%",

                  end: current.end,
                  toggleActions: current.toggleActions,
                },
              }
            );
          });
        } else {
          let hasTriggeredProgress = false;

          gsap.fromTo(
            itemsRef.current,
            {
              autoAlpha: 0,
              x: (_, el) =>
                el.dataset.x ? Number(el.dataset.x) : current.x ?? 0,
              y: (_, el) =>
                el.dataset.y ? Number(el.dataset.y) : current.y ?? 0,
              scale: (_, el) =>
                el.dataset.scale
                  ? Number(el.dataset.scale)
                  : current.scale ?? 1,
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: current.duration ?? 1,
              ease: current.ease ?? ease,
              stagger: current.stagger ?? 0,
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
                start: current.start ?? "top 100%",

                end: current.end,
                toggleActions: current.toggleActions,
              },
            }
          );
        }
      });

      return () => mm.revert();
    },
    {
      dependencies: [
        enable,
        responsiveKey,
        triggerByElement,
        toggleActions,
        start,
        end,
      ],
    }
  );

  return { containerRef, addToRefs };
};
