import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../shared/components/Button/Button";
import HeaderLeftDecor from "../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";
import Input from "../../../shared/components/Input/Input";
import HeadingDecorated from "../../../shared/components/HeadingDecorated/HeadingDecorated";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import ParagraphField from "./components/ParagraphField";

import { usePersistentQuery } from "../../../shared/hooks/useData.hook";
import { GET_ARTICLE_QUERY } from "../../../graphql/article/queries/getArticle.query";
import { STORAGE_KEYS } from "../../../shared/constants/storage.constants";
import type {
  GetArticleQuery,
  CreateArticleInput,
  UpdateArticleInput,
} from "../../../graphql/codegen/generated/graphql";
import { UPDATE_ARTICLE_MUTATION } from "../../../graphql/article/mutations/updateArticle.mutation";
import { CREATE_ARTICLE_MUTATION } from "../../../graphql/article/mutations/createArticle.mutation";
import {
  type UpdateArticleFormData,
  UpdateArticleFormSchema,
} from "../../../shared/utils/validation/UpdateArticleFormSchema";
import { uploadFile } from "../../../shared/api/uploadFile.api";
import { PARAGRAPH_FRAGMENT } from "../../../graphql/article/fragments/paragraph.fragment";
import { useFragment } from "../../../graphql/codegen/generated/fragment-masking";
import CardContextProvider from "../../../context/CardContext/CardContextProvider";
import CardWithContextHover from "../../../shared/components/Card/CardIsHoveredContext";
import IconCardFill from "../../Contact/components/IconCardFill/IconCardFill";
import changeFileIcon from "../../../../public/shared/icons/changeFile.svg";

const ArticleManager: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);
  const isEditMode = !!id;

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateArticleFormData>({
    resolver: zodResolver(UpdateArticleFormSchema),
    defaultValues: {
      name: "",
      description: "",
      imageSrc: "",
      publicationDate: new Date().toISOString().split("T")[0],
      paragraphs: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
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

  const onSubmit: SubmitHandler<UpdateArticleFormData> = async (data) => {
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
      navigate("/admin/blog");
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  if (isEditMode && isFirstLoad) return <LoadingSpinner className="h-screen" />;
  if (isEditMode && error && !article)
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
                  <div className="w-full aspect-200/150  bg-black/30 rounded-lg border border-border-default overflow-hidden flex items-center justify-center shrink-0">
                    {currentImageSrc ? (
                      <CardContextProvider>
                        <CardWithContextHover
                          className="w-full object-cover relative cursor-pointer"
                          mediaType={"image"}
                          mediaSrc={currentImageSrc}
                          isAnimated={true}
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                        >
                          <IconCardFill iconSrc={changeFileIcon} />
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
          onClick={() => navigate("/admin/blog")}
        >
          CANCEL
        </Button>
      </div>
    </form>
  );
};

export default ArticleManager;
