import { z } from "zod";

export const UserSchema = z
  .object({
    id: z.number().int().min(0, "Id can't be empty"),
    user: z.string().nonempty("User can't be empty"),
    email: z.string().nonempty("Email can't be empty"),
    password: z
      .string()
      .nonempty("Password can't be empty")
      .min(3, "Password must be 3 characters or more"),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password can't be empty")
      .min(3, "Confirm Password must be 3 characters or more"),
    rol: z.string().nonempty("Rol can't be empty"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
  });

export type Usuario = z.infer<typeof UserSchema>;
