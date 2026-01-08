import React from "react";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import seoImage from "././../../assets/ReservationPageMaterials/reservationHero.webp";
import reservationImage from "@/assets/ReservationPageMaterials/reservationHero.webp";
import { Metadata } from "next";
import ReservationForm from "./components/ReservationForm/ReservationForm";

export const metadata: Metadata = {
  title: "Book a Table",
  description:
    "Secure your spot at SRS. Whether it's a romantic dinner or a friendly gathering, exceptional sushi and a remarkable dining experience await.",
  openGraph: {
    images: {
      url: seoImage.src,
      width: seoImage.width,
      height: seoImage.height,
      alt: "SRS Reservation",
    },
  },
};

export default function Reservation() {
  return (
    <BasePageLayout
      isScreenHeight={true}
      heroCardProps={{
        heading: ["BOOK", "A TABLE"],
        mediaType: "image",
        imageProps: { src: reservationImage, alt: "reservation hero image" },
      }}
    >
      <ReservationForm />
    </BasePageLayout>
  );
}
