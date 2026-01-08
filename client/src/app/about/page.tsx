import { Metadata } from "next";
import AboutContent from "./components/AboutContent/AboutContent";

import seoImage from "@/assets/AboutPageMaterials/aboutHero.webp";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: "Our Story & Location",
  description:
    "Learn about the philosophy behind our restaurant. Visit us for an authentic Japanese dining experience in the heart of the city. Open daily for sushi lovers.",
  openGraph: {
    images: {
      url: seoImage.src,
      width: seoImage.width,
      height: seoImage.height,
      alt: "SRS About",
    },
  },
};

export default function About() {
  return <AboutContent />;
}
