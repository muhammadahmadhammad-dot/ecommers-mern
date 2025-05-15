import { Router } from "express";
import { create, getAll,deleteCategory, category, updateCategory } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get('/',getAll);
categoryRouter.post('/create',create);
categoryRouter.get('/:id',category);
categoryRouter.put('/update/:id',updateCategory);
categoryRouter.delete('/delete/:id',deleteCategory);

export default categoryRouter;