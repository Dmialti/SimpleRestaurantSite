import z from "zod";

export const DishFormSchema = z.object({
  name: z.string().min(1, { error: "Dish name is required" }),
  description: z.string().min(1, { error: "Description is required" }),
  price: z
    .number({ error: "Price must be a number" })
    .min(0, { error: "Price must be positive" }),
  categoryId: z.number().min(1, { error: "Category is required" }),
  imageSrc: z.string().min(1, { error: "Image URL is required" }),
  imageFile: z.any().optional(),
  available: z.boolean(),
});

export type DishFormData = z.infer<typeof DishFormSchema>;
