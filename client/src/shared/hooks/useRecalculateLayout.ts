"use client";

import { useEffect } from "react";

export function useRecalculateLayout(shouldRecalculate: boolean, delay = 200) {
  useEffect(() => {
    if (shouldRecalculate) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("resize"));

        window.dispatchEvent(new Event("page-ready"));
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [shouldRecalculate, delay]);
}
