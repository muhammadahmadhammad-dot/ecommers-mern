import { Router } from "express";
import { login, logout } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post('/login',login);
userRouter.post('/logout',authMiddleware,logout);

export default userRouter
