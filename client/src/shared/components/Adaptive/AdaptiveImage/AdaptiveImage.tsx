import React from "react";
import {
  AdaptiveMap,
  SupportedImageFormat,
  useAdaptiveSources,
} from "../../../hooks/useAdaptiveSrc.hook";

interface AdaptiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  mediaSrc: string;
  adaptiveSrc?: AdaptiveMap;
  formats?: SupportedImageFormat[];
}

export const AdaptiveImage = React.forwardRef<
  HTMLImageElement,
  AdaptiveImageProps
>(({ mediaSrc, adaptiveSrc, formats = ["avif", "webp"], ...props }, ref) => {
  const sources = useAdaptiveSources(mediaSrc, "image", adaptiveSrc, formats);

  return (
    <picture>
      {sources.map((s, index) => (
        <source
          key={`${s.query}-${s.type}-${index}`}
          media={s.query || undefined}
          type={s.type}
          srcSet={s.src}
        />
      ))}

      {/* Фінальний фоллбек — базове зображення (найбільш сумісне, напр. JPG) */}
      <img ref={ref} src={mediaSrc} {...props} />
    </picture>
  );
});
