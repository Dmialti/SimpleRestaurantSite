import z from "zod";

export const LogInFormSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email({ error: "Invalid email address" }),
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
});

export type LogInFormData = z.infer<typeof LogInFormSchema>;
