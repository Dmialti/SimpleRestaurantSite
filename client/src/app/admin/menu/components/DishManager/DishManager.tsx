"use client";

import React, { useRef, useState, useEffect } from "react";
import changeFileIcon from "../../../../../../public/shared/icons/changeFile.svg";
import { useDishManager } from "@/shared/hooks/admin/useDishManager";
import IconCardFill from "@/app/contact/components/IconCardFill/IconCardFill";
import CardContextProvider from "@/context/CardContext/CardContextProvider";
import Button from "@/shared/components/Button/Button";
import CardWithContextHover from "@/shared/components/Card/CardIsHoveredContext";
import HeaderLeftDecor from "@/shared/components/HeaderLeftDecor/HeaderLeftDecor";
import HeadingDecorated from "@/shared/components/HeadingDecorated/HeadingDecorated";
import Input from "@/shared/components/Input/Input";
import LoadingSpinner from "@/shared/components/LoadingSpinner/LoadingSpinner";

export default function DishManager() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [mounted, setMounted] = useState(false);

  const {
    isEditMode,
    numericId,
    formMethods,
    categoriesData,
    fetchingCategories,
    fetchingDish,
    dishError,
    dishData,
    isUploading,
    onSubmit,
    onCancel,
  } = useDishManager();

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
  } = formMethods;

  const currentImageSrc = watch("imageSrc");
  const { ref: registerRef, ...restRegister } = register("imageFile");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || (isEditMode && fetchingDish)) {
    return <LoadingSpinner className="h-screen" />;
  }

  if (isEditMode && dishError && !dishData) {
    return <div className="text-red-500 p-10">Error: {dishError.message}</div>;
  }

  const isBusy = isSubmitting || isUploading;

  return (
    <form
      className="h-full flex flex-col overflow-hidden text-text-default"
      onSubmit={onSubmit}
    >
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 pb-10">
          <div className="border-b border-border-default pb-6">
            <HeadingDecorated className="text-4xl font-forum">
              {isEditMode ? `EDIT DISH #${numericId}` : "CREATE NEW DISH"}
            </HeadingDecorated>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <HeaderLeftDecor className="text-2xl font-forum">
                Dish Name:
              </HeaderLeftDecor>
              <Input
                type="text"
                {...register("name")}
                errorMessage={errors.name?.message}
                className="w-full"
                placeholder="e.g. Maki Salmon"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-4 flex-1">
                <HeaderLeftDecor className="text-2xl font-forum">
                  Price ($):
                </HeaderLeftDecor>
                <Input
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  errorMessage={errors.price?.message}
                  className="w-full"
                  placeholder="0.00"
                />
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <HeaderLeftDecor className="text-2xl font-forum">
                  Category:
                </HeaderLeftDecor>
                <div className="relative">
                  <select
                    {...register("categoryId", { valueAsNumber: true })}
                    className="w-full bg-transparent border-b border-border-default/50 py-3 text-text-default font-satoshi focus:outline-none focus:border-primary-default appearance-none cursor-pointer disabled:opacity-50"
                    disabled={fetchingCategories}
                  >
                    <option
                      value={0}
                      className="bg-background-default text-text-muted"
                    >
                      {fetchingCategories ? "Loading..." : "Select a Category"}
                    </option>
                    {categoriesData?.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.id}
                        className="bg-background-default"
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                    ▼
                  </div>
                </div>
                {errors.categoryId && (
                  <span className="text-red-500 text-xs">
                    {errors.categoryId.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <HeaderLeftDecor className="text-2xl font-forum">
                Description:
              </HeaderLeftDecor>
              <Input
                type="text"
                {...register("description")}
                errorMessage={errors.description?.message}
                className="w-full"
                placeholder="Dish description"
              />
            </div>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="available"
                {...register("available")}
                className="w-5 h-5 accent-primary-default cursor-pointer"
              />
              <label
                htmlFor="available"
                className="font-forum text-xl cursor-pointer select-none"
              >
                Available for order
              </label>
            </div>

            <div className="flex flex-col gap-4">
              <HeaderLeftDecor className="text-2xl font-forum">
                Dish Image:
              </HeaderLeftDecor>
              <div className="flex flex-col gap-6 items-start">
                <div className="flex flex-row w-full gap-2 flex-1">
                  <div
                    role="button"
                    tabIndex={0}
                    className="w-full aspect-200/150 bg-black/30 rounded-lg border border-border-default overflow-hidden flex items-center justify-center shrink-0 cursor-pointer group focus:outline-none focus:border-primary-default transition-all"
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        fileInputRef.current?.click();
                    }}
                  >
                    {currentImageSrc ? (
                      <CardContextProvider>
                        <CardWithContextHover
                          className="w-full h-full object-cover relative cursor-pointer"
                          mediaType="image"
                          imageProps={{
                            src: currentImageSrc,
                            alt: currentImageSrc,
                            fill: true,
                          }}
                          isAnimated={true}
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                        >
                          <IconCardFill src="/shared/icons/changeFile.svg" />
                        </CardWithContextHover>
                      </CardContextProvider>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-text-muted group-hover:text-primary-default transition-colors">
                        <span className="text-xs">Click to upload</span>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    id="menu-image-upload"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    {...restRegister}
                    ref={(e) => {
                      registerRef(e);
                      fileInputRef.current = e;
                    }}
                  />
                </div>

                <div className="w-full">
                  <Input
                    type="text"
                    {...register("imageSrc")}
                    placeholder="Image URL"
                    readOnly
                    className="w-full text-sm text-text-muted bg-transparent border-none pl-0 pointer-events-none"
                  />
                  {errors.imageSrc && (
                    <span className="text-red-500 text-xs">
                      {errors.imageSrc.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center py-6 border-t border-border-default bg-background-default z-10 shrink-0">
        <Button variant="border" className="px-8 py-3" disabled={isBusy}>
          {isBusy
            ? isEditMode
              ? "SAVING..."
              : "CREATING..."
            : isEditMode
            ? "SAVE CHANGES"
            : "CREATE DISH"}
        </Button>
        <Button
          variant="border"
          className="px-8 py-3"
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
