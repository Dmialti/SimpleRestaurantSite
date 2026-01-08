import { Metadata } from "next";
import seoImage from "././../../assets/ContactPageMaterials/contactHero.avif";

import ContactContent from "./components/ContactContent/ContactContent";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: "Contact & Location",
  description:
    "Visit SRS in the heart of the city. Find our address, phone number, and opening hours. We are ready to welcome you for an unforgettable Japanese dining experience.",
  openGraph: {
    images: {
      url: seoImage.src,
      width: seoImage.width,
      height: seoImage.height,
      alt: "SRS Contact",
    },
  },
};

export default function Contact() {
  return <ContactContent />;
}
