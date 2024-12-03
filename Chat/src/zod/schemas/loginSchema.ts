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