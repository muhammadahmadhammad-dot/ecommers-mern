import { Router } from "express";
import { login, logout } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post('/login',login);
userRouter.post('/logout',logout);

export default userRouter
