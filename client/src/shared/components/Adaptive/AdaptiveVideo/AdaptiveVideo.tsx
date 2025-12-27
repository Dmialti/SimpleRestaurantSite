import React from "react";
import {
  AdaptiveMap,
  useAdaptiveSources,
} from "../../../hooks/useAdaptiveSrc.hook";

interface AdaptiveVideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  mediaSrc: string;
  adaptiveSrc?: AdaptiveMap;
}

export const AdaptiveVideo = React.forwardRef<
  HTMLVideoElement,
  AdaptiveVideoProps
>(({ mediaSrc, adaptiveSrc, children, ...props }, ref) => {
  const sources = useAdaptiveSources(mediaSrc, adaptiveSrc);

  return (
    <video ref={ref} {...props}>
      {sources.map((s) => (
        <source key={s.query} src={s.src} media={s.query} />
      ))}
      <source src={mediaSrc} />
      {children}
    </video>
  );
});
