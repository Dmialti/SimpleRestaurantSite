import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../shared/components/Button/Button";
import HeaderLeftDecor from "../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";
import Input from "../../../shared/components/Input/Input";
import HeadingDecorated from "../../../shared/components/HeadingDecorated/HeadingDecorated";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import CardContextProvider from "../../../context/CardContext/CardContextProvider";
import CardWithContextHover from "../../../shared/components/Card/CardIsHoveredContext";
import IconCardFill from "../../Contact/components/IconCardFill/IconCardFill";

import changeFileIcon from "../../../../public/shared/icons/changeFile.svg";

import { usePersistentQuery } from "../../../shared/hooks/usePersistentQuery.hook";
import { STORAGE_KEYS } from "../../../shared/constants/storage.constants";
import { uploadFile } from "../../../shared/api/uploadFile.api";
import {
  DishFormSchema,
  type DishFormData,
} from "../../../shared/utils/validation/DishFormSchema";

import { CREATE_DISH_MUTATION } from "../../../graphql/dish/mutations/createDish.mutation";
import { UPDATE_DISH_MUTATION } from "../../../graphql/dish/mutations/updateDish.mutation";
import { GET_DISH_QUERY } from "../../../graphql/dish/queries/getDish.query";
import { GET_CATEGORIES_QUERY } from "../../../graphql/category/queries/getCategories.query";

import type {
  GetDishQuery,
  GetCategoriesQuery,
  CreateDishInput,
  UpdateDishInput,
} from "../../../graphql/codegen/generated/graphql";

const DishManager: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);
  const isEditMode = !!id;

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: categoriesData, isFirstLoad: fetchingCategories } =
    usePersistentQuery<
      GetCategoriesQuery,
      object,
      GetCategoriesQuery["categories"]
    >(
      { query: GET_CATEGORIES_QUERY },
      STORAGE_KEYS.MENU_PREFIX + "categories",
      (data) => data.categories,
      []
    );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DishFormData>({
    resolver: zodResolver(DishFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: 0,
      imageSrc: "",
      available: true,
      imageFile: null,
    },
  });

  const currentImageSrc = watch("imageSrc");
  const imageFileList = watch("imageFile");
  const { ref: registerRef, ...restRegister } = register("imageFile");

  const {
    data: dishData,
    error,
    isFirstLoad: fetchingDish,
  } = usePersistentQuery<GetDishQuery, object, GetDishQuery["dish"] | null>(
    {
      query: GET_DISH_QUERY,
      variables: { id: numericId },
      pause: !isEditMode,
    },
    STORAGE_KEYS.MENU_DATA + id,
    (data) => data.dish,
    null
  );

  const [, updateDish] = useMutation(UPDATE_DISH_MUTATION);
  const [, createDish] = useMutation(CREATE_DISH_MUTATION);

  useEffect(() => {
    if (isEditMode && dishData) {
      reset({
        name: dishData.name,
        description: dishData.description,
        price: dishData.price,
        categoryId: dishData.categoryId,
        imageSrc: dishData.imageSrc,
        available: dishData.available,
      });
    }
  }, [dishData, reset, isEditMode]);

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const previewUrl = URL.createObjectURL(file);
      setValue("imageSrc", previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [imageFileList, setValue]);

  const onSubmit: SubmitHandler<DishFormData> = async (data) => {
    try {
      setIsUploading(true);
      let finalImageSrc = data.imageSrc;

      if (data.imageFile && data.imageFile.length > 0) {
        finalImageSrc = await uploadFile(data.imageFile[0], "menu");
      }

      const commonInputData = {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        imageSrc: finalImageSrc,
        available: data.available,
      };

      let result;

      if (isEditMode) {
        const updateInput: UpdateDishInput = {
          id: numericId,
          ...commonInputData,
        };
        result = await updateDish({ input: updateInput });
      } else {
        const createInput: CreateDishInput = {
          ...commonInputData,
        };
        result = await createDish({ input: createInput });
      }

      if (result.error) {
        alert(`Error: ${result.error.message}`);
        return;
      }

      alert(isEditMode ? "Saved! ✅" : "Created! 🎉");
      navigate("/admin/menu");
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  if (isEditMode && fetchingDish)
    return <LoadingSpinner className="h-screen" />;
  if (isEditMode && error && !dishData)
    return <div className="text-red-500 p-10">Error: {error.message}</div>;

  const isBusy = isSubmitting || isUploading;

  return (
    <form
      className="h-full overflow-hidden text-text-default"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-4 w-full h-full overflow-y-auto overflow-x-hidden">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 pb-20">
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
                  {fetchingCategories ? (
                    <div className="text-text-muted text-sm py-2">
                      Loading categories...
                    </div>
                  ) : (
                    <select
                      {...register("categoryId", { valueAsNumber: true })}
                      className="w-full bg-transparent border-b border-border-default/50 py-3 text-text-default font-satoshi focus:outline-none focus:border-primary-default appearance-none cursor-pointer"
                    >
                      <option
                        value={0}
                        className="bg-background-default text-text-muted"
                      >
                        Select a Category
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
                  )}

                  {!fetchingCategories && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                      ▼
                    </div>
                  )}
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
                    className="w-full aspect-200/150 bg-black/30 rounded-lg border border-border-default overflow-hidden flex items-center justify-center shrink-0 cursor-pointer group focus:outline-none focus:border-primary-default"
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        fileInputRef.current?.click();
                    }}
                  >
                    {currentImageSrc ? (
                      <CardContextProvider>
                        <CardWithContextHover
                          className="w-full h-full object-cover relative pointer-events-none"
                          mediaType={"image"}
                          mediaSrc={currentImageSrc}
                          isAnimated={true}
                        >
                          <IconCardFill src={changeFileIcon} />
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

      <div className="flex gap-4 mt-8 justify-center pt-8 border-t border-border-default sticky bottom-0 bg-background-default py-4 z-10">
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
            navigate("/admin/menu");
          }}
        >
          CANCEL
        </Button>
      </div>
    </form>
  );
};

export default DishManager;
