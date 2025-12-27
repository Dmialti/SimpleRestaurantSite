import React from "react";
import {
  AdaptiveMap,
  useAdaptiveSources,
} from "../../../hooks/useAdaptiveSrc.hook";

interface AdaptiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  mediaSrc: string;
  adaptiveSrc?: AdaptiveMap;
}

export const AdaptiveImage = React.forwardRef<
  HTMLImageElement,
  AdaptiveImageProps
>(({ mediaSrc, adaptiveSrc, ...props }, ref) => {
  const sources = useAdaptiveSources(mediaSrc, adaptiveSrc);

  return (
    <picture className="w-full h-full">
      {sources.map((s) => (
        <source key={s.query} media={s.query} srcSet={s.src} />
      ))}
      <img ref={ref} src={mediaSrc} {...props} />
    </picture>
  );
});
