import { useMemo } from "react";
import { mediaRegistry } from "../utils/services/assetLoader.service";

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
  fileName: string,
  mediaType: "image" | "video",
  adaptiveSrc?: AdaptiveMap,
  formats?: string[]
) {
  return useMemo(() => {
    const lastDot = fileName.lastIndexOf(".");
    const base = fileName.substring(0, lastDot);
    const originalExt = fileName.substring(lastDot + 1);

    const typesMap =
      mediaType === "video" ? VIDEO_MIME_TYPES : IMAGE_MIME_TYPES;
    const activeFormats =
      formats || (mediaType === "video" ? ["av1", "webm"] : ["avif", "webp"]);

    const findHashedSrc = (currentBase: string, ext: string) => {
      const targetName = `${currentBase}.${ext}`;
      console.log(mediaRegistry);
      return mediaRegistry[targetName] || null;
    };

    const generateSources = (currentBase: string, query: string = "") => {
      const res = activeFormats
        .map((f) => {
          const hashedSrc = findHashedSrc(currentBase, f);
          if (!hashedSrc) return null;

          return {
            query,
            type: typesMap[f],
            src: hashedSrc,
          };
        })
        .filter(Boolean) as { query: string; type: string; src: string }[];

      const originalHashed = findHashedSrc(currentBase, originalExt);
      if (originalHashed) {
        res.push({
          query,
          type: typesMap[originalExt] || `${mediaType}/${originalExt}`,
          src: originalHashed,
        });
      }
      return res;
    };

    const baseSources = generateSources(base);
    if (!adaptiveSrc) return baseSources;

    const sortedBreakpoints = Object.entries(adaptiveSrc).sort(
      ([a], [b]) => parseInt(a) - parseInt(b)
    );
    const adaptiveSources = sortedBreakpoints.flatMap(([px, suffix]) =>
      generateSources(`${base}-${suffix}`, `(max-width: ${px}px)`)
    );
    return [...adaptiveSources, ...baseSources];
  }, [fileName, adaptiveSrc, formats, mediaType]);
}
