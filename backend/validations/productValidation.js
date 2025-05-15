import z from "zod"

export const productSchema = z.object({
    title:z.string().trim().min(1,'Title  is required.').max(255,'Maximum 255 characters allowed.'),
    short_description:z.string().trim().min(1,'Short description  is required.').max(255,'Maximum 255 characters allowed.'),
    price:z.number().min(1,'Price  is required.').max(12,'Maximum 255 characters allowed.'),
    category:z.string().trim().min(1,'Category  is required.'),
    description:z.string().trim().min(1,'Description  is required.'),
    status : z.string()
        .transform((val) => val === "true").default(true),
});

