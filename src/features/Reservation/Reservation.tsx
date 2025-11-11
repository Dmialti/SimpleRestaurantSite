import React from "react";
import styles from "./Reservation.module.css";
import HeroCard from "../shared/components/HeroCard/HeroCard";
import HeadingDecorated from "../shared/components/HeadingDecorated/HeadingDecorated";
import Input from "./components/Input/Input";

const Reservation: React.FC = () => {
  return (
    <div className={`${styles.reservationSection} w-full h-screen gap-4 p-6`}>
      <HeroCard
        className={styles.heroSection}
        heading={["BOOK", "A TABLE"]}
        mediaType="image"
        mediaSrc="/ReservationPageMaterials/reservationHero.png"
      />
      <div
        className={`${styles.contentSection} px-24 py-20 flex flex-col items-center gap-20 border-border-default border rounded-2xl`}
      >
        <div className="flex flex-col gap-4 text-text-default text-center">
          <HeadingDecorated className="font-forum text-[40px] leading-[120%] tracking-[1px]">
            RESERVATION
          </HeadingDecorated>
          <div className="font-satoshi text-[18px] leading-[150%] tracking-[0px]">
            Secure your spot at Qitchen, where exceptional sushi and a
            remarkable dining experience await.
          </div>
        </div>
        <form className="flex flex-col gap-4">
          <Input type="text" placeholder="Name" />
          <Input type="tel" placeholder="Phone Number" />
          <Input type="email" placeholder="Email" />
          <div className="flex flex-row gap-4">
            <Input
              className="flex-1 min-w-0"
              type="number"
              placeholder="Guests"
            />
            <Input className="flex-1 min-w-0" type="date" placeholder="Date" />
            <Input className="flex-1 min-w-0" type="time" placeholder="Time" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
