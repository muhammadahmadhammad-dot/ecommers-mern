import orderModel from "../models/orderModel.js";
import {
  orderStatusValidationSchema,
  orderValidationSchema,
} from "../validations/orderValidation.js";

export const create = async (req, res) => {
  try {
    const { data, error } = orderValidationSchema.safeParse(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: "Validation error!",
        validateErrors: error.flatten().fieldErrors,
      });
    }
    const { items, shippingInfo, totalAmount } = data;
    const order = await orderModel.create({
      items,
      shippingInfo,
      totalAmount,
      status: "Processing",
    });

    res.status(201).send({success:true, message: "Order placed", order });
  } catch (error) {
    console.log("updateCategory controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const all = async (req, res) => {
  try {
    const orders = await orderModel.find();

    res.status(201).send({ message: "All Orders", orders });
  } catch (error) {
    console.log("all controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const order = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findOne({ _id: id });
    if (!order) {
      res.status(404).send({ success: false, message: "Order Not Found" });
    }
    res.status(201).send({ message: "Order detail", order });
  } catch (error) {
    console.log("order controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
export const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = orderStatusValidationSchema.safeParse(req.body);

    if (error) {
      return res.status(400).send({
        success: false,
        message: "Validation error!",
        validateErrors: error.flatten().fieldErrors,
      });
    }
    const order = await orderModel.findOne({ _id: id });
    if (!order) {
      return res.status(404).send({ success: false, message: "Order Not Found" });
    }
    order.status = data.status;
    await order.save();

    res.status(201).send({ success: true, message: "Order updated successfully", order });
  } catch (error) {
    console.log("order controller error : " + error);
    return res.status(400).send({ success: false, message: `Error ${error}` });
  }
};
