// components/SEO.tsx
import { useEffect } from "react";
import { useSEO } from "../../hooks/useSEO.hook";

interface SEOProps {
  title?: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const { setPageMetadata } = useSEO();

  useEffect(() => {
    setPageMetadata({ title, description });

    return () => setPageMetadata({});
  }, [title, description, setPageMetadata]);

  return null;
};
