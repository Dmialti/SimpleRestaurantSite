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

export interface MediaSource {
  query: string;
  type: string;
  src: string;
}

export type SupportedVideoFormat = "av1" | "hevc" | "webm" | "mp4";

export type SupportedImageFormat = "avif" | "webp" | "jpg" | "png";

export function useAdaptiveSources(
  fileName: string,
  mediaType: "image" | "video",
  adaptiveSrc?: AdaptiveMap,
  formats?: string[]
): MediaSource[] {
  return useMemo(() => {
    if (!fileName) return [];

    const isRemote = fileName.startsWith("http");
    const lastDot = fileName.lastIndexOf(".");
    const base = fileName.substring(0, lastDot);
    const originalExt = fileName.substring(lastDot + 1);

    const typesMap =
      mediaType === "video" ? VIDEO_MIME_TYPES : IMAGE_MIME_TYPES;
    const activeFormats =
      formats || (mediaType === "video" ? ["av1", "webm"] : ["avif", "webp"]);

    const getSrc = (currentBase: string, ext: string): string | null => {
      if (isRemote) {
        return `${currentBase}.${ext}`;
      }
      const targetName = `${currentBase}.${ext}`;
      return mediaRegistry[targetName] || null;
    };

    const generateSources = (
      currentBase: string,
      query: string = ""
    ): MediaSource[] => {
      const sources: MediaSource[] = [];

      activeFormats.forEach((f) => {
        const src = getSrc(currentBase, f);
        if (src) {
          sources.push({ query, type: typesMap[f], src });
        }
      });

      const originalSrc = getSrc(currentBase, originalExt);
      if (originalSrc) {
        sources.push({
          query,
          type: typesMap[originalExt] || `${mediaType}/${originalExt}`,
          src: originalSrc,
        });
      }

      return sources;
    };

    let adaptiveSources: MediaSource[] = [];
    if (adaptiveSrc) {
      const sortedBreakpoints = Object.entries(adaptiveSrc).sort(
        ([a], [b]) => parseInt(a) - parseInt(b)
      );

      adaptiveSources = sortedBreakpoints.flatMap(([px, suffix]) =>
        generateSources(`${base}-${suffix}`, `(max-width: ${px}px)`)
      );
    }

    const baseSources = generateSources(base);

    return [...adaptiveSources, ...baseSources];
  }, [fileName, adaptiveSrc, formats, mediaType]);
}
