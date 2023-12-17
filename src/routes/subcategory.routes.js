import { Router } from "express";
import { subcategory_controller } from "../controllers/subcategory.controller.js";

export const subcategory_router = Router();
subcategory_router.get('/', subcategory_controller.get).get('/:id', subcategory_controller.get).post('/', subcategory_controller.post).put('/:id', subcategory_controller.put).delete('/:id', subcategory_controller.delete)