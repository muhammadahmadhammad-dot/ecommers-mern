import categoryModel from "../models/categoryModel.js";
import { categorySchema } from "../validations/categoryValidation.js";

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const {data,error} = categorySchema.safeParse(req.body);
      if (error) {
      return res.status(400).send({
        success: false,
        message: "Validation error!",
        validateErrors: error.flatten().fieldErrors,
      });
    }

    const name = data.name;
    const category = await categoryModel.findOneAndUpdate(
      {_id:id},
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category Not Found!",
      });
    }
    return res
      .status(200)
      .send({
        success: true,
        message: "Category Updated Succesfully",
        category,
      });
  } catch (error) {
    console.log("updateCategory controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const category = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category Not Found!",
      });
    }
    return res
      .status(200)
      .send({ success: true, message: "Category", category });
  } catch (error) {
    console.log("category controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category Not Found!",
      });
    }
    return res
      .status(200)
      .send({ success: true, message: "Categroy deleted successfuly" });
  } catch (error) {
    console.log("getAll controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const getAll = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
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
    const { data, error } = categorySchema.safeParse(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: "Validation error!",
        validateErrors: error.flatten().fieldErrors,
      });
    }
    const name = data.name;

    const category = categoryModel.create({ name });
    return res.status(200).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log("create controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
