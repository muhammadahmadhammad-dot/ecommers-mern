import { Router } from "express";
import { create, getAll } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get('/',getAll);
categoryRouter.post('/',create);

export default categoryRouter;