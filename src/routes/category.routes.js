import { Router } from "express";
import { category_controller } from "../controllers/category.controller.js";


export const category_router = Router();
category_router.get('/', category_controller.get).get('/:id', category_controller.get).post('/', category_controller.post).put('/:id', category_controller.put).delete('/:id', category_controller.delete)