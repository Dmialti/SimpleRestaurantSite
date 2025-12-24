import React from "react";
import reservationHeroImg from "../../assets/ReservationPageMaterials/reservationHero.png";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import ReservationForm from "./ReservationForm/ReservationForm";

const Reservation: React.FC = () => {
  return (
    <BasePageLayout
      isScreenHeight={true}
      heading={["BOOK", "A TABLE"]}
      mediaType="image"
      mediaSrc={reservationHeroImg}
    >
      <ReservationForm />
    </BasePageLayout>
  );
};

export default Reservation;
