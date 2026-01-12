"use client";

import React, { useState, useEffect } from "react";
import { useArticleManager } from "@/shared/hooks/admin/useArticleManager";
import IconCardFill from "@/app/contact/components/IconCardFill/IconCardFill";
import CardContextProvider from "@/context/CardContext/CardContextProvider";
import Button from "@/shared/components/Button/Button";
import CardWithContextHover from "@/shared/components/Card/CardIsHoveredContext";
import HeaderLeftDecor from "@/shared/components/HeaderLeftDecor/HeaderLeftDecor";
import HeadingDecorated from "@/shared/components/HeadingDecorated/HeadingDecorated";
import Input from "@/shared/components/Input/Input";
import ParagraphField from "../../components/ParagraphField.tsx/ParagraphField";

export default function ArticleManager() {
  const {
    isEditMode,
    numericId,
    isUploading,
    error,
    article,
    formMethods: { register },
    formState: { errors, isSubmitting },
    fieldArrayMethods: { fields, append, remove, move },
    fileInputRef,
    currentImageSrc,
    registerRef,
    restRegister,
    onSubmit,
    onCancel,
  } = useArticleManager();

  if (isEditMode && error && !article) {
    return <div className="text-red-500 p-10">Error: {error.message}</div>;
  }

  const isBusy = isSubmitting || isUploading;

  return (
    <form
      className="h-full overflow-hidden text-text-default"
      onSubmit={onSubmit}
    >
      <div className="p-4 w-full h-full overflow-y-auto overflow-x-hidden">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 pb-20">
          {/* Header */}
          <div className="border-b border-border-default pb-6">
            <HeadingDecorated className="text-4xl font-forum">
              {isEditMode ? `EDIT ARTICLE #${numericId}` : "CREATE NEW ARTICLE"}
            </HeadingDecorated>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <HeaderLeftDecor className="text-2xl font-forum">
                Article name:
              </HeaderLeftDecor>
              <Input
                type="text"
                {...register("name")}
                errorMessage={errors.name?.message}
                className="w-full"
              />
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
              />
            </div>

            <div className="flex flex-col gap-4">
              <HeaderLeftDecor className="text-2xl font-forum">
                Date:
              </HeaderLeftDecor>
              <Input
                type="date"
                {...register("publicationDate")}
                errorMessage={errors.publicationDate?.message}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-4">
              <HeaderLeftDecor className="text-2xl font-forum">
                Main Image:
              </HeaderLeftDecor>
              <div className="flex flex-col gap-6 items-start">
                <div className="flex flex-row w-full gap-2 flex-1">
                  <div className="w-full h-full aspect-200/150 bg-black/30 rounded-lg border border-border-default overflow-hidden flex items-center justify-center shrink-0">
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
                      <span className="text-text-muted text-xs">No image</span>
                    )}
                  </div>
                  <input
                    type="file"
                    id="image-upload"
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

            <div className="flex flex-col gap-6 mt-8 pt-8 border-t border-border-default">
              <div className="flex justify-between items-center">
                <HeaderLeftDecor className="text-2xl font-forum">
                  Paragraphs:
                </HeaderLeftDecor>
                <Button
                  variant="border"
                  className="px-4 py-2 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    append({
                      name: "",
                      content: "",
                      position: fields.length,
                    });
                  }}
                >
                  + ADD PARAGRAPH
                </Button>
              </div>

              <div className="flex flex-col gap-6">
                {fields.map((field, index) => (
                  <ParagraphField
                    key={field.id}
                    index={index}
                    register={register}
                    remove={remove}
                    move={move}
                    total={fields.length}
                    errors={errors}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8 justify-center pt-8 border-t border-border-default sticky bottom-0 bg-background-default py-4 z-10">
        <Button variant="border" className="px-8 py-3" disabled={isBusy}>
          {isBusy
            ? isEditMode
              ? "SAVING..."
              : "CREATING..."
            : isEditMode
            ? "SAVE CHANGES"
            : "CREATE ARTICLE"}
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
