import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../shared/components/Button/Button";
import HeaderLeftDecor from "../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";
import Input from "../../../shared/components/Input/Input";
import HeadingDecorated from "../../../shared/components/HeadingDecorated/HeadingDecorated";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";

import {
  UserFormSchema,
  type UserFormData,
} from "../../../shared/utils/validation/UserFormSchema";

import { CREATE_USER_MUTATION } from "../../../graphql/user/mutations/createUser.mutation";
import { UPDATE_USER_MUTATION } from "../../../graphql/user/mutations/updateUser.mutation";
import { GET_USER_QUERY } from "../../../graphql/user/queries/getUser.query";
import {
  type UpdateUserInput,
  type CreateUserInput,
  Role,
} from "../../../graphql/codegen/generated/graphql";

const UserEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);
  const isEditMode = !!id;

  const [{ data: userData, fetching: fetchingUser, error: fetchError }] =
    useQuery({
      query: GET_USER_QUERY,
      variables: { id: numericId },
      pause: !isEditMode,
    });

  const [, createUser] = useMutation(CREATE_USER_MUTATION);
  const [, updateUser] = useMutation(UPDATE_USER_MUTATION);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      email: "",
      password: "",
      role: Role.Manager,
    },
  });

  useEffect(() => {
    if (isEditMode && userData?.user) {
      reset({
        email: userData.user.email,
        password: "",
        role: userData.user.role,
      });
    }
  }, [userData, reset, isEditMode]);

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      if (!isEditMode && (!data.password || data.password.length < 6)) {
        setError("password", {
          message: "Password is required for new users (min 6 chars)",
        });
        return;
      }

      let result;

      if (isEditMode) {
        const updateInput: UpdateUserInput = {
          id: numericId,
          email: data.email,
          role: data.role,
        };

        if (data.password && data.password.length > 0) {
          updateInput.password = data.password;
        }

        result = await updateUser({ input: updateInput });
      } else {
        const createInput: CreateUserInput = {
          email: data.email,
          password: data.password!,
          role: data.role,
        };
        result = await createUser({ input: createInput });
      }

      if (result.error) {
        alert(`Error: ${result.error.message}`);
      } else {
        navigate("/admin/users");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    }
  };

  if (isEditMode && fetchingUser)
    return <LoadingSpinner className="h-screen" />;
  if (isEditMode && fetchError)
    return <div className="p-10 text-red-500">Error: {fetchError.message}</div>;

  return (
    <form
      className="h-full overflow-hidden text-text-default"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-4 w-full h-full overflow-y-auto overflow-x-hidden">
        <div className="max-w-2xl mx-auto flex flex-col gap-10 pb-20">
          <div className="border-b border-border-default pb-6">
            <HeadingDecorated className="text-4xl font-forum">
              {isEditMode ? `EDIT USER #${numericId}` : "CREATE NEW USER"}
            </HeadingDecorated>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <HeaderLeftDecor className="text-2xl font-forum">
                Email Address:
              </HeaderLeftDecor>
              <Input
                type="email"
                {...register("email")}
                errorMessage={errors.email?.message}
                className="w-full"
                placeholder="user@example.com"
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-baseline">
                <HeaderLeftDecor className="text-2xl font-forum">
                  Password:
                </HeaderLeftDecor>
                {isEditMode && (
                  <span className="text-xs text-text-muted font-satoshi">
                    (Leave empty to keep current password)
                  </span>
                )}
              </div>
              <Input
                type="password"
                {...register("password")}
                errorMessage={errors.password?.message}
                className="w-full"
                placeholder={isEditMode ? "••••••••" : "Create a password"}
                autoComplete="new-password"
              />
            </div>

            <div className="flex flex-col gap-4">
              <HeaderLeftDecor className="text-2xl font-forum">
                User Role:
              </HeaderLeftDecor>
              <div className="relative">
                <select
                  {...register("role")}
                  className="w-full bg-transparent border-b border-border-default/50 py-3 text-text-default font-satoshi focus:outline-none focus:border-primary-default appearance-none cursor-pointer"
                >
                  {Object.values(Role).map((role) => (
                    <option
                      key={role}
                      value={role}
                      className="bg-background-default text-text-default"
                    >
                      {role}
                    </option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                  ▼
                </div>
              </div>
              {errors.role && (
                <span className="text-red-500 text-xs">
                  {errors.role.message}
                </span>
              )}

              <div className="text-xs text-text-muted font-satoshi mt-2 p-3 border border-border-default/30 rounded bg-white/5">
                <p>
                  <strong>MANAGER:</strong> Can manage menu items (Dishes).
                </p>
                <p>
                  <strong>ADMIN:</strong> Can manage users and managers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8 justify-center pt-8 border-t border-border-default sticky bottom-0 bg-background-default py-4 z-10">
        <Button variant="border" className="px-8 py-3" disabled={isSubmitting}>
          {isSubmitting
            ? "SAVING..."
            : isEditMode
            ? "SAVE CHANGES"
            : "CREATE USER"}
        </Button>
        <Button
          variant="border"
          className="px-8 py-3 hover:bg-red-900/10 hover:border-red-500/50"
          onClick={(e) => {
            e.preventDefault();
            navigate("/admin/users");
          }}
        >
          CANCEL
        </Button>
      </div>
    </form>
  );
};

export default UserEditor;
