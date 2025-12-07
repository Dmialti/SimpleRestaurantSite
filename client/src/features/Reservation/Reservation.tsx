import React from "react";
import styles from "./Reservation.module.css";
import Input from "./components/Input/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReservationFormSchema,
  type ReservationFormData,
} from "../../shared/utils/validation/ReservationFormSchema";

import reservationHeroImg from "../../assets/ReservationPageMaterials/reservationHero.png";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import Button from "../../shared/components/Button/Button";
import HeadingDecorated from "../../shared/components/HeadingDecorated/HeadingDecorated";

const Reservation: React.FC = () => {
  const onSubmit: SubmitHandler<ReservationFormData> = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ReservationFormSchema),
  });

  const formValues = watch();
  const allFieldsFilled = Object.values(formValues).every(
    (value) => value !== "" && value !== undefined && value !== null
  );

  return (
    <BasePageLayout
      isScreenHeight={true}
      heading={["BOOK", "A TABLE"]}
      mediaType="image"
      mediaSrc={reservationHeroImg}
    >
      <div
        className={`${styles.contentSection} h-full min-w-0 px-24 py-20 flex flex-col items-center gap-20 rounded-2xl`}
      >
        <div className="flex flex-col gap-4 text-text-default text-center">
          <HeadingDecorated className="font-forum text-[40px] leading-[120%] tracking-[1px]">
            RESERVATION
          </HeadingDecorated>
          <div className="font-satoshi text-[18px] leading-[150%] tracking-[0px] px-17">
            Secure your spot at Qitchen, where exceptional sushi and a
            remarkable dining experience await.
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-17 w-full"
        >
          <Input
            {...register("firstName")}
            type="text"
            placeholder="Name"
            errorMessage={errors.firstName?.message}
          />
          <Input
            {...register("phoneNumber")}
            type="tel"
            placeholder="Phone Number"
            errorMessage={errors.phoneNumber?.message}
          />
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            errorMessage={errors.email?.message}
          />
          <div className="flex flex-row gap-4">
            <Input
              {...register("guestsCount")}
              className="flex-1 min-w-0"
              type="number"
              placeholder="Guests"
              errorMessage={errors.guestsCount?.message}
            />
            <Input
              {...register("date")}
              className="flex-1 min-w-0"
              type="date"
              placeholder="Date"
              errorMessage={errors.date?.message}
            />
            <Input
              {...register("time")}
              className="flex-1 min-w-0"
              type="time"
              placeholder="Time"
              errorMessage={errors.time?.message}
            />
          </div>
          <Button
            className="py-4 font-satoshi text-[12px] leading-[190%] tracking-[1px]"
            enabled={allFieldsFilled}
            type="submit"
          >
            RESERVE
          </Button>
        </form>
      </div>
    </BasePageLayout>
  );
};

export default Reservation;
