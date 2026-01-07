"use client";

import {
  ReservationFormData,
  ReservationFormSchema,
} from "@/shared/utils/validation/ReservationFormSchema";
import styles from "./ReservationForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStaggeredReveal } from "@/shared/hooks/useStaggeredReveal.hook";
import { mergeRefs } from "@/shared/utils/helpers/mergeRefs.helper";
import BaseFormLayout from "@/shared/components/FormBaseLayout/FormBaseLayout";
import Button from "@/shared/components/Button/Button";
import { useBasePageLayoutAnimationContext } from "@/shared/hooks/useBasePageLayoutAnimationContext";
import Input from "@/shared/components/Input/Input";

export default function ReservationForm() {
  const { isContentAnimationDone } = useBasePageLayoutAnimationContext();

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

  const {
    containerRef: staggeredFormContainerRef,
    addToRefs: staggeredFormAddToRefs,
  } = useStaggeredReveal({
    stagger: 0.1,
    y: 50,
    duration: 0.5,
    triggerByElement: true,
    enable: isContentAnimationDone,
  });
  const registerWithAnimation = (name: keyof ReservationFormData) => {
    const { ref: formRef, ...rest } = register(name);
    return {
      ...rest,
      ref: mergeRefs(staggeredFormAddToRefs, formRef),
    };
  };

  return (
    <BaseFormLayout
      ref={staggeredFormContainerRef}
      header="RESERVATION"
      description="Secure your spot at Qitchen, where exceptional sushi and a remarkable dining experience await."
      onSubmit={handleSubmit(onSubmit)}
      className={styles.mainSection}
    >
      <Input
        className="invisible"
        {...registerWithAnimation("firstName")}
        type="text"
        placeholder="Name"
        errorMessage={errors.firstName?.message}
      />

      <Input
        className="invisible"
        {...registerWithAnimation("phoneNumber")}
        type="tel"
        placeholder="Phone Number"
        errorMessage={errors.phoneNumber?.message}
      />

      <Input
        className="invisible"
        {...registerWithAnimation("email")}
        type="email"
        placeholder="Email"
        errorMessage={errors.email?.message}
      />

      <div
        className={`${styles.flexibleInputs} flex flex-row gap-4 w-full overflow-hidden`}
      >
        <Input
          {...registerWithAnimation("guestsCount")}
          className="flex-1 min-w-0 invisible"
          type="number"
          placeholder="Guests"
          errorMessage={errors.guestsCount?.message}
        />
        <Input
          {...registerWithAnimation("date")}
          className="flex-1 min-w-0 invisible"
          type="date"
          placeholder="Date"
          errorMessage={errors.date?.message}
        />
        <Input
          {...registerWithAnimation("time")}
          className="flex-1 min-w-0 invisible"
          type="time"
          placeholder="Time"
          errorMessage={errors.time?.message}
        />
      </div>

      <Button
        ref={staggeredFormAddToRefs}
        className="py-4 font-satoshi text-[12px] leading-[190%] tracking-[1px] invisible"
        disabled={!allFieldsFilled}
        variant="submit"
      >
        RESERVE
      </Button>
    </BaseFormLayout>
  );
}
