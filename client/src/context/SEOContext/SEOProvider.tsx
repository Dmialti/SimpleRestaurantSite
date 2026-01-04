import { useState, ReactNode } from "react";
import { SEOContext, SEOState } from "./SEOContext";
import defaultImage from "../../assets/StartingPageMaterials/images/side-1.avif";

export const SEOProvider = ({ children }: { children: ReactNode }) => {
  const [metadata, setMetadata] = useState<SEOState>({});

  const BRAND_NAME = "SRS. Modern Japanese";
  const DEFAULT_DESC =
    "The Sanctuary of Exquisite Flavors. Experience the art of sushi.";
  const DEFAULT_IMAGE = defaultImage;
  const SITE_URL = "";

  const fullTitle = metadata.title
    ? `${metadata.title} | ${BRAND_NAME}`
    : `${BRAND_NAME} — The Home of Happy People`;

  const fullDesc = metadata.description || DEFAULT_DESC;
  const fullImage = metadata.image || DEFAULT_IMAGE;
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : SITE_URL;

  return (
    <SEOContext.Provider value={{ setPageMetadata: setMetadata }}>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical" href={currentUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Qitchen" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={fullImage} />

      {children}
    </SEOContext.Provider>
  );
};
