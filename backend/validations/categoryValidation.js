import z from "zod"

export const createCategorySchema = ({
    name:z.string().trim().min(1,'Category Name is required.').max(255,'Maximum 255 characters allowed.')
});