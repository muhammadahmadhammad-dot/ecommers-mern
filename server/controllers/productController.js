import productModel from "../models/productModel.js";
import { productSchema } from "../validations/productValidation.js";
import { uploadImageCloudinary } from "../helper/cloudinaryHelper.js";

export const getActive = async (req, res) => {
   try {
    const {slug} = req.params
    const product = await productModel.findOne({ slug:slug,status: true });
    return res
      .status(200)
      .send({ success: true, message: "Product", product });
  } catch (error) {
    console.log("getActive controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
}
export const getAllActive = async (req, res) => {
  try {
    const products = await productModel.find({ status: true });
    return res
      .status(200)
      .send({ success: true, message: "All active products", products });
  } catch (error) {
    console.log("getAllActive controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const getAll = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res
      .status(200)
      .send({ success: true, message: "All products", products });
  } catch (error) {
    console.log("getAll controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const create = async (req, res) => {
  try {
    const { data, error } = productSchema.safeParse(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: "Validation error!",
        validateErrors: error.flatten().fieldErrors,
      });
    }
    const { title, short_description, description, price, category, status } =
      data;

    // const featureImage = req.file;
    // const filePath = featureImage.path;
    // cloudinary
    const { secure_url, public_id } = await uploadImageCloudinary(
      req.file.buffer,
      "products"
    );
    if (!secure_url) {
      return res.status(400).json({ error: secure_url });
    }
    const createdBy = req.user._id;

    const product = new productModel({
      title,
      short_description,
      description,
      price,
      category,
      featureImage: {
        source_url: secure_url,
        public_id,
      },
      createdBy,
      status,
    });

    const savedProduct = await product.save();
    return res.status(200).send({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.log("create controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const product = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product Not Found!",
      });
    }
    return res.status(200).send({ success: true, message: "Product", product });
  } catch (error) {
    console.log("product controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    
    const { data, error } = productSchema.safeParse(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: "Validation error!",
        validateErrors: error.flatten().fieldErrors,
      });
    }

     const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }

   
    product.set(data);

    if (req.file) {
      const featureImage = req.file;

      // Upload to cloudinary from memory buffer
      const { secure_url, public_id } = await uploadImageCloudinary(
        featureImage.buffer,
        "products"
      );

      if (!secure_url) {
        return res.status(400).json({ error: "Cloudinary upload failed" });
      }
      //  delete the old image
      await cloudinary.uploader.destroy(product.featureImage.public_id);

      product.featureImage = {
        source_url: secure_url,
        public_id: public_id,
      };
    }
    
    const savedProduct = await product.save();
    
    return res.status(200).send({
      success: true,
      message: "Product Updated Succesfully",
      product:savedProduct,
    });
  } catch (error) {
    console.log("updateProduct controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product Not Found!",
      });
    }
    return res
      .status(200)
      .send({ success: true, message: "Product deleted successfuly" });
  } catch (error) {
    console.log("deleteProduct controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
