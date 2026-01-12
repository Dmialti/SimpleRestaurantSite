import { useEffect } from "react";
import { useMutation, useQuery } from "urql";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useParams, useRouter } from "next/navigation";

export const useUserEditor = () => {
  const { id } = useParams();
  const router = useRouter();
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

  const formMethods = useForm<UserFormData>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      email: "",
      password: "",
      role: Role.Manager,
    },
  });

  const {
    reset,
    setError,
    formState: { isSubmitting },
  } = formMethods;

  useEffect(() => {
    if (isEditMode && userData?.user) {
      reset({
        email: userData.user.email,
        password: "",
        role: userData.user.role,
      });
    }
  }, [userData, reset, isEditMode]);

  const onCancel = () => router.push("/admin/user");

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
        router.push("/admin/user");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    }
  };

  return {
    isEditMode,
    numericId,
    fetchingUser,
    fetchError,
    userData,
    formMethods,
    isSubmitting,
    onSubmit: formMethods.handleSubmit(onSubmit),
    onCancel,
  };
};
