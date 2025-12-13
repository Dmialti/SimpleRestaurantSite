import { z } from "zod";
import { Role } from "../../../graphql/codegen/generated/graphql";

export const UserFormSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z
      .string({ error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    role: z.enum(Role),
  })
  .refine(() => {
    return true;
  });

export type UserFormData = z.infer<typeof UserFormSchema>;
