"use client";

import { useUserEditor } from "@/shared/hooks/admin/useUserEditor";
import { Role } from "@/graphql/codegen/generated/graphql";
import Button from "@/shared/components/Button/Button";
import HeaderLeftDecor from "@/shared/components/HeaderLeftDecor/HeaderLeftDecor";
import HeadingDecorated from "@/shared/components/HeadingDecorated/HeadingDecorated";
import Input from "@/shared/components/Input/Input";

export default function UserEditor() {
  const {
    isEditMode,
    numericId,
    fetchError,
    formMethods: {
      register,
      formState: { errors },
    },
    isSubmitting,
    onSubmit,
    onCancel,
  } = useUserEditor();

  if (isEditMode && fetchError) {
    return <div className="p-10 text-red-500">Error: {fetchError.message}</div>;
  }

  return (
    <form
      className="h-full overflow-hidden text-text-default"
      onSubmit={onSubmit}
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
                placeholder={isEditMode ? "********" : "Create a password"}
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
                <p className="mb-1">
                  <strong className="text-primary-default">MANAGER:</strong>
                  Can manage menu items (Dishes) and Blog.
                </p>
                <p>
                  <strong className="text-primary-default">ADMIN:</strong>
                  Can manage users, managers, and all content.
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
            onCancel();
          }}
        >
          CANCEL
        </Button>
      </div>
    </form>
  );
}
