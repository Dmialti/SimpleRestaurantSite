import React from "react";
import {
  AdaptiveMap,
  SupportedVideoFormat,
  useAdaptiveSources,
} from "../../../hooks/useAdaptiveSources.hook";

interface AdaptiveVideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  mediaSrc: string;
  adaptiveSrc?: AdaptiveMap;
  formats?: SupportedVideoFormat[];
}

export const AdaptiveVideo = React.forwardRef<
  HTMLVideoElement,
  AdaptiveVideoProps
>(
  (
    { mediaSrc, adaptiveSrc, children, formats = ["webm", "mp4"], ...props },
    ref
  ) => {
    const sources = useAdaptiveSources(mediaSrc, "video", adaptiveSrc, formats);

    return (
      <video ref={ref} playsInline {...props}>
        {sources.map((s, index) => (
          <source
            key={`${s.src}-${index}`}
            src={s.src}
            type={s.type}
            media={s.query || undefined}
          />
        ))}

        <source src={mediaSrc} />

        {children}
      </video>
    );
  }
);
