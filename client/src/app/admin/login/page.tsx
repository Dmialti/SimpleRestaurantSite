"use client";

import React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/components/Button/Button";
import BaseFormLayout from "@/shared/components/FormBaseLayout/FormBaseLayout";
import Input from "@/shared/components/Input/Input";
import {
  type LogInFormData,
  LogInFormSchema,
} from "@/shared/utils/validation/LogInFormSchema";
import { loginAction } from "./login.action";

export default function LogIn() {
  const { pending } = useFormStatus();
  const [state, dispatch] = useActionState(loginAction, null);

  const {
    register,
    formState: { errors, isValid },
  } = useForm<LogInFormData>({
    resolver: zodResolver(LogInFormSchema),
    mode: "onChange",
  });

  return (
    <BaseFormLayout
      header="ADMIN LOGIN"
      description="Log in to your admin account to manage the site data"
      action={dispatch}
    >
      {state?.error && (
        <p className="text-red-600 font-satoshi text-lg max-w-md min-h-lh mb-4">
          {state.error}
        </p>
      )}

      <div className="relative">
        <div className="flex flex-col gap-4">
          <Input
            {...register("email")}
            name="email"
            type="text"
            placeholder="Email"
            errorMessage={errors.email?.message}
          />
          <Input
            {...register("password")}
            name="password"
            type="password"
            placeholder="Password"
            errorMessage={errors.password?.message}
          />

          <Button
            className="py-4 font-satoshi text-[12px] leading-[190%] tracking-[1px]"
            disabled={pending || !isValid}
            variant="submit"
            type="submit"
          >
            {pending ? "LOGGING IN..." : "RESERVE"}
          </Button>
        </div>
      </div>
    </BaseFormLayout>
  );
}
