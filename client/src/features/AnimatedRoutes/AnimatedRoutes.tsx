import React, { useState, useRef, useLayoutEffect } from "react";
import { Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { waitForAssets } from "../../shared/utils/helpers/waitForAssets.helper";

interface Props {
  children: React.ReactNode;
}

const AnimatedRoutes: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  const isTransitioning = useRef(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (location.pathname !== displayLocation.pathname) {
      isTransitioning.current = true;

      gsap.to(overlayRef.current, {
        scaleY: 1,
        duration: 0.7,
        ease: "expo.inOut",
        transformOrigin: "bottom",
        onComplete: () => {
          setDisplayLocation(location);
          window.scrollTo(0, 0);
        },
      });
    }
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (
      isTransitioning.current &&
      displayLocation.pathname === location.pathname
    ) {
      const container = containerRef.current;
      if (!container) return;

      const imageLoadPromise = waitForAssets(container);

      Promise.resolve(imageLoadPromise).then(() => {
        requestAnimationFrame(() => {
          window.dispatchEvent(new Event("page-ready"));

          gsap.to(overlayRef.current, {
            scaleY: 0,
            duration: 0.8,
            ease: "expo.inOut",
            delay: 0.1,
            transformOrigin: "top",
            onComplete: () => {
              isTransitioning.current = false;
            },
          });
        });
      });
    }
  }, [displayLocation, location.pathname]);

  return (
    <div ref={containerRef}>
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black z-[99999] pointer-events-none"
        style={{
          transform: "scaleY(0)",
          willChange: "transform",
        }}
      />
      <Routes location={displayLocation}>{children}</Routes>
    </div>
  );
};

export default AnimatedRoutes;
