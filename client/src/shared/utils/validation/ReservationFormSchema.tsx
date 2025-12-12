import z from "zod";

export const ReservationFormSchema = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .min(1, { error: "First name cannot be empty" }),

  phoneNumber: z
    .string({ error: "Phone number is required" })
    .regex(/^\+?\s*(\d[\s-()]?){7,15}$/, {
      error: "Invalid phone number",
    }),

  email: z.email({ error: "Invalid email address" }),

  guestsCount: z.coerce
    .number({ error: "Guests must be a number" })
    .min(1, { error: "At least 1 guest is required" })
    .max(10, { error: "Maximum 10 guests allowed" }),

  date: z.iso.date({ error: "Invalid date provided" }),

  time: z
    .string({ error: "Time is required" })
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      error: "Time must be in HH:MM format (00:00–23:59)",
    })
    .transform((val) => {
      const [h, m] = val.split(":").map(Number);
      return { hours: h, minutes: m };
    }),
});

export type ReservationFormData = z.infer<typeof ReservationFormSchema>;
