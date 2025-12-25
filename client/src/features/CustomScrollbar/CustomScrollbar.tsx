import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { useLenis } from "lenis/react";
import { useLocation } from "react-router-dom";

export const CustomScrollbar: React.FC = () => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();
  const location = useLocation();

  const checkVisibility = useCallback(() => {
    if (!lenis) return;

    lenis.resize();

    const shouldBeVisible = lenis.limit > 1;
    setIsVisible(shouldBeVisible);
  }, [lenis]);

  useLayoutEffect(() => {
    if (!lenis) return;
    const resizeObserver = new ResizeObserver(() => checkVisibility());
    resizeObserver.observe(document.body);
    resizeObserver.observe(document.documentElement);
    return () => resizeObserver.disconnect();
  }, [lenis, checkVisibility]);

  useEffect(() => {
    const handlePageReady = () => {
      checkVisibility();
    };

    window.addEventListener("page-ready", handlePageReady);

    checkVisibility();

    return () => {
      window.removeEventListener("page-ready", handlePageReady);
    };
  }, [checkVisibility, location.pathname]);

  useLenis((instance) => {
    if (!thumbRef.current) return;

    const canScroll = instance.limit > 1;
    if (canScroll !== isVisible) setIsVisible(canScroll);

    if (canScroll) {
      const scrollHeight = window.innerHeight;
      const thumbHeight = 100;
      const progress = instance.scroll / instance.limit;
      const moveAmount = progress * (scrollHeight - thumbHeight);
      thumbRef.current.style.transform = `translateY(${moveAmount}px)`;
    }
  });

  return (
    <div
      className={`fixed top-0 right-0 w-[6px] h-full z-[100] pointer-events-none pr-[2px] py-1 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={thumbRef}
        className="w-full bg-white/30 rounded-full h-[100px]"
        style={{ willChange: "transform" }}
      />
    </div>
  );
};
