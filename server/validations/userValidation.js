import z from "zod"

export const loginSchema = z.object({
    email:z.string().trim().email('Please provide correct email'),
    password:z.string().trim().min(1,'Password is required.'),
});