import { useMemo } from "react";

export type AdaptiveMap = {
  [max_width_px: string]: string;
};

const VIDEO_MIME_TYPES: Record<string, string> = {
  av1: 'video/mp4; codecs="av01.0.05M.08"',
  hevc: 'video/mp4; codecs="hvc1"',
  webm: "video/webm",
  mp4: "video/mp4",
};

const IMAGE_MIME_TYPES: Record<string, string> = {
  avif: "image/avif",
  webp: "image/webp",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

export type SupportedVideoFormat = "av1" | "hevc" | "webm" | "mp4";

export type SupportedImageFormat = "avif" | "webp" | "jpg" | "png";

export function useAdaptiveSources(
  mediaSrc: string,
  mediaType: "image" | "video",
  adaptiveSrc?: AdaptiveMap,
  formats?: string[]
) {
  return useMemo(() => {
    const lastDot = mediaSrc.lastIndexOf(".");
    const base = mediaSrc.substring(0, lastDot);
    const originalExt = mediaSrc.substring(lastDot + 1);

    const typesMap =
      mediaType === "video" ? VIDEO_MIME_TYPES : IMAGE_MIME_TYPES;
    const defaultFormats =
      mediaType === "video" ? ["av1", "hevc", "webm"] : ["avif", "webp"];
    const activeFormats = formats || defaultFormats;

    const generateSources = (currentBase: string, query: string = "") => {
      const res = activeFormats
        .filter((f) => typesMap[f])
        .map((f) => ({
          query,
          type: typesMap[f],
          src: `${currentBase}.${f === "hevc" || f === "av1" ? "mp4" : f}`,
        }));

      res.push({
        query,
        type: typesMap[originalExt] || `${mediaType}/${originalExt}`,
        src: `${currentBase}.${originalExt}`,
      });
      return res;
    };

    if (!adaptiveSrc) return generateSources(base);

    const sortedBreakpoints = Object.entries(adaptiveSrc).sort(
      ([a], [b]) => parseInt(a) - parseInt(b)
    );

    return sortedBreakpoints.flatMap(([px, suffix]) =>
      generateSources(`${base}-${suffix}`, `(max-width: ${px}px)`)
    );
  }, [mediaSrc, adaptiveSrc, formats, mediaType]);
}
