import { useState, ReactNode } from "react";
import { SEOContext, SEOState } from "./SEOContext";
import defaultImage from "../../assets/StartingPageMaterials/images/side-1.avif";

export const SEOProvider = ({ children }: { children: ReactNode }) => {
  const [metadata, setMetadata] = useState<SEOState>({});

  const BRAND_NAME = "SRS. Modern Japanese";
  const DEFAULT_DESC =
    "The Sanctuary of Exquisite Flavors. Experience the art of sushi.";
  const DEFAULT_IMAGE = defaultImage;
  const DEFAULT_IMAGE_WIDTH = "1200";
  const DEFAULT_IMAGE_HEIGHT = "630";
  const SITE_URL = "https://simple-restaurant-site.vercel.app";
  const finalImage = metadata.image?.startsWith("http")
    ? metadata.image
    : `${SITE_URL}${metadata.image || DEFAULT_IMAGE}`;

  const fullTitle = metadata.title
    ? `${metadata.title} | ${BRAND_NAME}`
    : `${BRAND_NAME} — The Home of Happy People`;

  const fullDesc = metadata.description || DEFAULT_DESC;
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
      <meta property="og:site_name" content="Simple Restaurant Site" />
      <meta property="og:image" content={finalImage} />
      <meta
        property="og:image:width"
        content={metadata.imageWidth || DEFAULT_IMAGE_WIDTH}
      />
      <meta
        property="og:image:height"
        content={metadata.imageHeight || DEFAULT_IMAGE_HEIGHT}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={finalImage} />

      {children}
    </SEOContext.Provider>
  );
};
