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
  const [isDragging, setIsDragging] = useState(false);
  const scrollData = useRef({ startY: 0, startScroll: 0 });

  const lenis = useLenis();
  const location = useLocation();

  const thumbHeight = 100;

  const checkVisibility = useCallback(() => {
    if (!lenis) return;
    lenis.resize();
    const shouldBeVisible = lenis.limit > 1;
    setIsVisible(shouldBeVisible);
  }, [lenis]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!lenis) return;
    setIsDragging(true);

    scrollData.current = {
      startY: e.clientY,
      startScroll: lenis.scroll,
    };

    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    if (!isDragging || !lenis) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - scrollData.current.startY;
      const scrollHeight = window.innerHeight;

      const scrollRatio = lenis.limit / (scrollHeight - thumbHeight);

      const targetScroll =
        scrollData.current.startScroll + deltaY * scrollRatio;

      lenis.scrollTo(targetScroll, { immediate: true });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, lenis]);

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
    if (!thumbRef.current || isDragging) return;

    const canScroll = instance.limit > 1;
    if (canScroll !== isVisible) setIsVisible(canScroll);

    if (canScroll) {
      const scrollHeight = window.innerHeight;
      const progress = instance.scroll / instance.limit;
      const moveAmount = progress * (scrollHeight - thumbHeight);
      thumbRef.current.style.transform = `translateY(${moveAmount}px)`;
    }
  });

  return (
    <div
      className={`fixed top-0 right-0 w-[10px] h-full z-[100] pr-[2px] py-1 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 cursor-none"
      }`}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <div
        ref={thumbRef}
        onMouseDown={handleMouseDown}
        className={`w-full rounded-full h-[100px] transition-colors duration-200 hover:bg-white/45 ${
          isDragging ? "bg-white/60 hover:bg-white/60" : "bg-white/30"
        }`}
        style={{
          willChange: "transform",
          pointerEvents: "auto",
        }}
      />
    </div>
  );
};
