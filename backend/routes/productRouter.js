import { Router } from "express";
import authMiddleware from "../middlewares/authmiddleware.js";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js";
import {getAllActive,getAll, create, product, updateProduct, deleteProduct, getActive} from "../controllers/productController.js"
import multerMiddleware from "../middlewares/multerMiddleware.js";
const productRouter = Router();

productRouter.get('/',getAllActive);
productRouter.get('/product/:slug',getActive);
productRouter.get('/products',[authMiddleware, isAdminMiddleware],getAll);
productRouter.post('/create',[authMiddleware, isAdminMiddleware,multerMiddleware.single('featureImage')],create);
productRouter.get('/:id',[authMiddleware, isAdminMiddleware],product);
productRouter.put('/update/:id',[authMiddleware, isAdminMiddleware,multerMiddleware.single('featureImage')],updateProduct);
productRouter.delete('/delete/:id',[authMiddleware, isAdminMiddleware],deleteProduct);

export default productRouter;