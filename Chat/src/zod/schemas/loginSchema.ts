import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string()
    .min(8, {message:"Password must have 8 characters"})
    .regex(/[A-Z]/,{message:"Password must have a uppercase letter"})
    .regex(/[a-z]/, {message:"Password must have smallcase letter"})
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()]/, { message: "Password must contain at least one special character" })
})

export const SignupSchema = z.object({
    fullname: z
    .preprocess((val) => (typeof val === "string" ? val.trim() : val), z
      .string()
      .min(1, { message: "Name is required" })
      .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" })),
  username: z
    .preprocess((val) => (typeof val === "string" ? val.trim() : val), z
      .string()
      .min(1, { message: "Username is required" })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, digits, and underscores" })),
    email: z.string().email("Invalid email"),
    password: z.string()
    .min(8, {message:"Password must have 8 characters"})
    .regex(/[A-Z]/,{message:"Password must have a uppercase letter"})
    .regex(/[a-z]/, {message:"Password must have smallcase letter"})
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()]/, { message: "Password must contain at least one special character" })
})