import React from "react";
import Input from "../../shared/components/Input/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReservationFormSchema,
  type ReservationFormData,
} from "../../shared/utils/validation/ReservationFormSchema";

import reservationHeroImg from "../../assets/ReservationPageMaterials/reservationHero.png";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import Button from "../../shared/components/Button/Button";
import BaseFormLayout from "../../shared/components/FormBaseLayout/FormBaseLayout";
import styles from "./Reservation.module.css";

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
      <BaseFormLayout
        header="RESERVATION"
        description="Secure your spot at Qitchen, where exceptional sushi and a remarkable dining experience await."
        onSubmit={handleSubmit(onSubmit)}
        className={styles.mainSection}
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
        <div className={`${styles.flexibleInputs} flex flex-row gap-4`}>
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
          disabled={!allFieldsFilled}
          variant="submit"
        >
          RESERVE
        </Button>
      </BaseFormLayout>
    </BasePageLayout>
  );
};

export default Reservation;
