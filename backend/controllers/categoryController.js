import categoryModel from "../models/categoryModel.js";
import { createCategorySchema } from "../validations/CategoryValidation.js";

export const getAll = async (req, res) => {
  try {
    const categories = categoryModel.find({});
    return res
      .status(200)
      .send({ success: true, message: "All Categories", categories });
  } catch (error) {
    console.log("getAll controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const create = async (req, res) => {
  try {
    const { data, error } = createCategorySchema.safeParse(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: "Validation error!",
        validateErrors: error.flatten().fieldErrors,
      });
    }
    const name = data.name;

    const category = categoryModel.create({ name });
    return res
      .status(200)
      .send({
        success: true,
        message: "Category created successfully",
        category,
      });
  } catch (error) {
    console.log("create controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
