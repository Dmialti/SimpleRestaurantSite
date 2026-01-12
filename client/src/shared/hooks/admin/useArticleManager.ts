import { useState, useEffect, useRef } from "react";
import { useMutation } from "urql";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFragment } from "../../../graphql/codegen/generated/fragment-masking";

import { GET_ARTICLE_QUERY } from "../../../graphql/article/queries/getArticle.query";
import { UPDATE_ARTICLE_MUTATION } from "../../../graphql/article/mutations/updateArticle.mutation";
import { CREATE_ARTICLE_MUTATION } from "../../../graphql/article/mutations/createArticle.mutation";
import { PARAGRAPH_FRAGMENT } from "../../../graphql/article/fragments/paragraph.fragment";

import type {
  GetArticleQuery,
  CreateArticleInput,
  UpdateArticleInput,
} from "../../../graphql/codegen/generated/graphql";
import {
  type ArticleFormData,
  ArticleFormSchema,
} from "../../../shared/utils/validation/UpdateArticleFormSchema";

import { usePersistentQuery } from "../../../shared/hooks/usePersistentQuery.hook";
import { STORAGE_KEYS } from "../../../shared/constants/storage.constants";
import { uploadFile } from "../../../shared/api/uploadFile.api";
import { useParams, useRouter } from "next/navigation";

export const useArticleManager = () => {
  const { id } = useParams();
  const router = useRouter();
  const numericId = Number(id);
  const isEditMode = !!id;

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formMethods = useForm<ArticleFormData>({
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: {
      name: "",
      description: "",
      imageSrc: "",
      publicationDate: new Date().toISOString().split("T")[0],
      paragraphs: [],
    },
  });

  const { register, control, handleSubmit, reset, watch, setValue, formState } =
    formMethods;

  const fieldArrayMethods = useFieldArray({
    control,
    name: "paragraphs",
  });

  const currentImageSrc = watch("imageSrc");
  const imageFileList = watch("imageFile");
  const { ref: registerRef, ...restRegister } = register("imageFile");

  const {
    data: article,
    error,
    isFirstLoad,
  } = usePersistentQuery<
    GetArticleQuery,
    object,
    GetArticleQuery["article"] | null
  >(
    {
      query: GET_ARTICLE_QUERY,
      variables: { id: numericId },
      pause: !isEditMode,
    },
    STORAGE_KEYS.ARTICLE_PREFIX + id,
    (data) => data.article,
    null
  );

  const unmaskedParagraphs = useFragment(
    PARAGRAPH_FRAGMENT,
    article?.paragraphs
  );

  const [, updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION);
  const [, createArticle] = useMutation(CREATE_ARTICLE_MUTATION);

  useEffect(() => {
    if (isEditMode && article) {
      reset({
        name: article.name,
        description: article.description,
        imageSrc: article.imageSrc,
        publicationDate: new Date(article.publicationDate)
          .toISOString()
          .split("T")[0],
        paragraphs:
          unmaskedParagraphs?.map((p) => ({
            id: p.id,
            name: p.name,
            content: p.content,
            position: p.position,
          })) || [],
      });
    }
  }, [article, reset, isEditMode, unmaskedParagraphs]);

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const previewUrl = URL.createObjectURL(file);
      setValue("imageSrc", previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [imageFileList, setValue]);

  const onCancel = () => router.push("/admin/blog");

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    try {
      setIsUploading(true);
      let finalImageSrc = data.imageSrc;

      if (data.imageFile && data.imageFile.length > 0) {
        finalImageSrc = await uploadFile(data.imageFile[0], "blog");
      }

      const commonInputData = {
        name: data.name,
        description: data.description,
        imageSrc: finalImageSrc,
        publicationDate: new Date(data.publicationDate).toISOString(),
        paragraphs: data.paragraphs.map((p, index) => ({
          name: p.name,
          content: p.content,
          position: index,
        })),
      };

      let result;

      if (isEditMode) {
        const updateInput: UpdateArticleInput = {
          id: numericId,
          ...commonInputData,
        };
        result = await updateArticle({ input: updateInput });
      } else {
        const createInput: CreateArticleInput = {
          ...commonInputData,
        };
        result = await createArticle({ input: createInput });
      }

      if (result.error) {
        alert(`Error: ${result.error.message}`);
        return;
      }

      alert(
        isEditMode
          ? "Article updated successfully! ✅"
          : "Article created successfully! 🎉"
      );
      router.push("/admin/blog");
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isEditMode,
    numericId,
    isUploading,
    isFirstLoad,
    error,
    article,

    formMethods,
    formState,
    fieldArrayMethods,

    fileInputRef,
    currentImageSrc,
    registerRef,
    restRegister,

    onSubmit: handleSubmit(onSubmit),
    onCancel,
  };
};
