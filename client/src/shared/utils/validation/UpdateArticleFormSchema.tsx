import z from "zod";

const ParagraphSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Header is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  position: z.number(),
});

export const UpdateArticleFormSchema = z.object({
  name: z.string().min(1, { message: "Article name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageSrc: z.string().min(1, { message: "Image URL is required" }),
  imageFile: z.any(),
  publicationDate: z.iso.date({ error: "Invalid date provided" }),
  paragraphs: z.array(ParagraphSchema),
});

export type UpdateArticleFormData = z.infer<typeof UpdateArticleFormSchema>;
