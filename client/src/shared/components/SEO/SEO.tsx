interface SEOProps {
  title: string;
  description: string;
  imageSrc?: string;
  siteName?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  imageSrc,
  siteName = "Qitchen",
}) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageSrc && <meta property="og:image" content={imageSrc} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageSrc && <meta name="twitter:image" content={imageSrc} />}
    </>
  );
};
