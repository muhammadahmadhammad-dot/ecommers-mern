import { Router } from "express";
import { create,all,order,changeStatus } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authmiddleware.js";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js";

const orderRouter = Router();

orderRouter.post("/create", create); //checkout
orderRouter.get("/",[authMiddleware, isAdminMiddleware], all);
orderRouter.get("/:id",[authMiddleware, isAdminMiddleware], order);
orderRouter.put("/update-status/:id",[authMiddleware, isAdminMiddleware], changeStatus);

export default orderRouter;
