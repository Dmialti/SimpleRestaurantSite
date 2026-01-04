import React from "react";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import ReservationForm from "./ReservationForm/ReservationForm";
import { SEO } from "../../shared/components/SEO/SEO";
import seoImage from "././../../assets/ReservationPageMaterials/reservationHero.avif";

const Reservation: React.FC = () => {
  return (
    <>
      <SEO
        title="Book a Table"
        description="Secure your spot at Qitchen. Whether it's a romantic dinner or a friendly gathering, exceptional sushi and a remarkable dining experience await."
        image={seoImage}
      />
      <BasePageLayout
        isScreenHeight={true}
        heading={["BOOK", "A TABLE"]}
        mediaType="image"
        mediaSrc="reservationHero.png"
      >
        <ReservationForm />
      </BasePageLayout>
    </>
  );
};

export default Reservation;
