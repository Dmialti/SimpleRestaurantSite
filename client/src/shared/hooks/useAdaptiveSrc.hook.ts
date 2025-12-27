import { useMemo } from "react";

export type AdaptiveMap = {
  /** key: max-width in px */
  [max_width_px: string]: string;
};

export function useAdaptiveSources(
  mediaSrc: string,
  adaptiveSrc?: AdaptiveMap
) {
  return useMemo(() => {
    const lastDot = mediaSrc.lastIndexOf(".");
    const base = mediaSrc.substring(0, lastDot);
    const ext = mediaSrc.substring(lastDot);

    if (!adaptiveSrc) return [];

    return Object.entries(adaptiveSrc)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([px, suffix]) => ({
        query: `(max-width: ${px}px)`,
        src: `${base}-${suffix}${ext}`,
      }));
  }, [mediaSrc, adaptiveSrc]);
}
