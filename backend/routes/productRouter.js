import { Router } from "express";
import { create, getAll,deleteCategory, category, updateCategory } from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authmiddleware.js";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js";

const productRouter = Router();

productRouter.get('/',getAllActive);
productRouter.get('/products',[authMiddleware, isAdminMiddleware],getAll);
productRouter.post('/create',[authMiddleware, isAdminMiddleware,imageStoreMiddleware.single('featureImage')],create);
productRouter.get('/:id',[authMiddleware, isAdminMiddleware],product);
productRouter.put('/update/:id',[authMiddleware, isAdminMiddleware],updateProduct);
productRouter.delete('/delete/:id',[authMiddleware, isAdminMiddleware],deleteProduct);

export default productRouter;