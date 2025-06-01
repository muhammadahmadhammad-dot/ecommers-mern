import { Router } from "express";
import { create, getAll,deleteCategory, category, updateCategory } from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js";

const categoryRouter = Router();

categoryRouter.get('/',getAll);
categoryRouter.post('/create',[authMiddleware, isAdminMiddleware],create);
categoryRouter.get('/:id',[authMiddleware, isAdminMiddleware],category);
categoryRouter.put('/update/:id',[authMiddleware, isAdminMiddleware],updateCategory);
categoryRouter.delete('/delete/:id',[authMiddleware, isAdminMiddleware],deleteCategory);

export default categoryRouter;