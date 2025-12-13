import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button/Button";
import BaseFormLayout from "../../../shared/components/FormBaseLayout/FormBaseLayout";
import Input from "../../../shared/components/Input/Input";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../../shared/hooks/useAuth.hook";
import {
  type LogInFormData,
  LogInFormSchema,
} from "../../../shared/utils/validation/LogInFormSchema";

const LogIn: React.FC = () => {
  const { logIn } = useAuth();
  const [logInError, setLogInError] = useState<string | null>(null);
  const [isTryingToLogin, setIsTryingToLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LogInFormData> = async (data) => {
    try {
      setLogInError(null);
      setIsTryingToLogin(true);
      await logIn(data.email, data.password);
      navigate("/admin/menu");
    } catch (error) {
      if (error instanceof Error) {
        setLogInError(error.message);
      } else {
        setLogInError("Something went wrong. Please try again.");
      }
      setIsTryingToLogin(false);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LogInFormSchema) });

  const formValues = watch();
  const allFieldsFilled = Object.values(formValues).every(
    (value) => value !== "" && value !== null && value !== undefined
  );

  return (
    <BaseFormLayout
      header="ADMIN LOGIN"
      description="Log in to your admin account to manage the site data"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-red-600 font-satoshi text-lg max-w-md min-h-lh">
        {logInError}
      </p>
      <div className="relative">
        {isTryingToLogin && (
          <LoadingSpinner className="absolute h-full inset-0" />
        )}
        <div
          className={`flex flex-col gap-4 ${
            isTryingToLogin
              ? "opacity-50 pointer-events-none select-none filter blur-[2px]"
              : "opacity-100"
          }`}
        >
          <Input
            {...register("email")}
            type="text"
            placeholder="Email"
            errorMessage={errors.email?.message}
          />
          <Input
            {...register("password")}
            type="text"
            placeholder="Password"
            errorMessage={errors.password?.message}
          />
          <Button
            className="py-4 font-satoshi text-[12px] leading-[190%] tracking-[1px]"
            disabled={!allFieldsFilled}
            variant="submit"
          >
            RESERVE
          </Button>
        </div>
      </div>
    </BaseFormLayout>
  );
};

export default LogIn;
