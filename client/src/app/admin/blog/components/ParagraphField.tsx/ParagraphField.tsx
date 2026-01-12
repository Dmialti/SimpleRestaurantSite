import React from "react";
import type {
  UseFormRegister,
  FieldErrors,
  UseFieldArrayRemove,
  UseFieldArrayMove,
} from "react-hook-form";
import Button from "../../../../../shared/components/Button/Button";
import Input from "../../../../../shared/components/Input/Input";
import type { ArticleFormData } from "../../../../../shared/utils/validation/UpdateArticleFormSchema";

interface ParagraphFieldProps {
  index: number;
  register: UseFormRegister<ArticleFormData>;
  remove: UseFieldArrayRemove;
  move: UseFieldArrayMove;
  total: number;
  errors: FieldErrors<ArticleFormData>;
}

const ParagraphField: React.FC<ParagraphFieldProps> = ({
  index,
  register,
  remove,
  move,
  total,
  errors,
}) => {
  const fieldErrors = errors.paragraphs?.[index];

  return (
    <div className="bg-black/20 border border-border-default/50 rounded-lg p-6 flex gap-4 relative group">
      <div className="font-forum text-3xl text-primary-default/30 select-none">
        #{index + 1}
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <input type="hidden" {...register(`paragraphs.${index}.id`)} />

        <div>
          <Input
            type="text"
            {...register(`paragraphs.${index}.name`, {
              required: "Header is required",
            })}
            placeholder="Paragraph Header (e.g., Introduction)"
            className="w-full font-forum text-xl bg-transparent border-b border-border-default/30 focus:border-primary-default px-0 rounded-none"
            errorMessage={fieldErrors?.name?.message as string}
          />
        </div>

        <div>
          <textarea
            {...register(`paragraphs.${index}.content`, {
              required: "Content is required",
            })}
            placeholder="Write the paragraph content here..."
            rows={4}
            className="w-full bg-transparent border border-border-default/50 rounded p-3 text-text-default font-satoshi focus:border-primary-default outline-none resize-y"
          />
          {fieldErrors?.content && (
            <span className="text-red-500 text-xs mt-1">
              {fieldErrors.content.message as string}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="border"
          className="p-2 rounded-full!"
          onClick={(e) => {
            e.preventDefault();
            move(index, index - 1);
          }}
          disabled={index === 0}
        >
          ↑
        </Button>
        <Button
          variant="border"
          className="p-2 rounded-full!"
          onClick={(e) => {
            e.preventDefault();
            move(index, index + 1);
          }}
          disabled={index === total - 1}
        >
          ↓
        </Button>
        <Button
          variant="border"
          className="p-2 rounded-full! text-red-400 border-red-900/50 hover:bg-red-900/20 mt-auto"
          onClick={(e) => {
            e.preventDefault();
            remove(index);
          }}
        >
          🗑️
        </Button>
      </div>
    </div>
  );
};

export default ParagraphField;
