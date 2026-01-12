import { useEffect, useState } from "react";
import { useMutation } from "urql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GET_CATEGORIES_QUERY } from "@/graphql/category/queries/getCategories.query";
import {
  GetCategoriesQuery,
  GetDishQuery,
} from "@/graphql/codegen/generated/graphql";
import { CREATE_DISH_MUTATION } from "@/graphql/dish/mutations/createDish.mutation";
import { UPDATE_DISH_MUTATION } from "@/graphql/dish/mutations/updateDish.mutation";
import { GET_DISH_QUERY } from "@/graphql/dish/queries/getDish.query";

import { useParams, useRouter } from "next/navigation";
import { uploadFile } from "../../api/uploadFile.api";
import { STORAGE_KEYS } from "../../constants/storage.constants";
import {
  DishFormData,
  DishFormSchema,
} from "../../utils/validation/DishFormSchema";
import { usePersistentQuery } from "../usePersistentQuery.hook";

export const useDishManager = () => {
  const { id } = useParams();

  const router = useRouter();

  const numericId = Number(id);
  const isEditMode = !!id && !isNaN(numericId);
  const [isUploading, setIsUploading] = useState(false);

  const formMethods = useForm<DishFormData>({
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

  const { reset, watch, setValue } = formMethods;
  const imageFileList = watch("imageFile");

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
    data: dishData,
    error: dishError,
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

  const onSubmit = async (data: DishFormData) => {
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
        result = await updateDish({
          input: { id: numericId, ...commonInputData },
        });
      } else {
        result = await createDish({ input: { ...commonInputData } });
      }

      if (result.error) throw new Error(result.error.message);

      alert(isEditMode ? "Saved! ✅" : "Created! 🎉");

      router.push("/admin/menu");
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isEditMode,
    numericId,
    formMethods,
    categoriesData,
    fetchingCategories,
    fetchingDish,
    dishError,
    dishData,
    isUploading,
    onSubmit: formMethods.handleSubmit(onSubmit),

    onCancel: () => router.push("/admin/menu"),
  };
};
