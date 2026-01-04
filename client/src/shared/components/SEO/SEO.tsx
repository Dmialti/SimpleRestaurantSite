import { useEffect } from "react";
import { useSEO } from "../../hooks/useSEO.hook";
import { SEOState } from "../../../context/SEOContext/SEOContext";

export const SEO: React.FC<SEOState> = ({
  title,
  description,
  image,
  imageHeight,
  imageWidth,
}) => {
  const { setPageMetadata } = useSEO();

  useEffect(() => {
    setPageMetadata({ title, description, image, imageWidth, imageHeight });
    return () => setPageMetadata({});
  }, [title, description, image, imageWidth, imageHeight, setPageMetadata]);

  return null;
};
