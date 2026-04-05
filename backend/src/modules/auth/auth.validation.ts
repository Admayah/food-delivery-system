import z from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,
        "Password must be at least 8 characters"
    ).regex(
        /[A-Za-z]/,
        "must contain at least one letter"
    ).regex(
        /[0-9]/,
        "must contain at least one number"
    ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});