import z from "zod";

export const ReservationFormSchema = z.object({
  firstName: z.string(),
  phoneNumber: z
    .string()
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
  email: z.email(),
  guestsCount: z.coerce.number().min(1).max(10),
  date: z.coerce.date(),
  time: z
    .string()
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val))
    .transform((val) => {
      const [h, m] = val.split(":").map(Number);
      return { hours: h, minutes: m };
    }),
});

export type ReservationFormData = z.infer<typeof ReservationFormSchema>;
