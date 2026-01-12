"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { TransitionRouter } from "next-transition-router";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  const [prevPath, setPrevPath] = useState(pathname);

  const isTransitioning = useRef(false);

  const handleLeave = (next: () => void) => {
    isTransitioning.current = true;

    document.body.style.pointerEvents = "none";
    document.body.style.cursor = "wait";

    gsap.to(overlayRef.current, {
      scaleY: 1,
      duration: 0.8,
      ease: "power4.inOut",
      transformOrigin: "bottom",
      onComplete: next,
    });
  };

  const handleEnter = (next: () => void) => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("page-ready"));

    gsap.to(overlayRef.current, {
      scaleY: 0,
      duration: 0.8,
      ease: "power4.inOut",
      transformOrigin: "top",
      delay: 0.1,
      onComplete: () => {
        document.body.style.pointerEvents = "";
        document.body.style.cursor = "";
        isTransitioning.current = false;
        next();
      },
    });
  };

  useGSAP(() => {
    if (pathname !== prevPath) {
      setPrevPath(pathname);

      if (!isTransitioning.current) {
        document.body.style.pointerEvents = "none";

        gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: "bottom" });

        handleEnter(() => {});
      }
    }
  }, [pathname]);

  useLayoutEffect(() => {
    document.body.style.pointerEvents = "none";
    document.body.style.cursor = "wait";
    handleEnter(() => {});

    return () => {
      document.body.style.pointerEvents = "";
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <TransitionRouter auto={true} leave={handleLeave} enter={handleEnter}>
      <div className="relative min-h-screen w-full">
        <div
          ref={overlayRef}
          className="fixed top-0 left-0 w-full h-full bg-black z-99999 pointer-events-none"
          style={{ transform: "scaleY(1)" }}
        />

        <div ref={wrapperRef}>{children}</div>
      </div>
    </TransitionRouter>
  );
}
