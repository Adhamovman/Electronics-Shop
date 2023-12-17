import { Router } from "express";
import { brand_controller } from "../controllers/brand.controller.js";


export const brand_router = Router();
brand_router.get('/', brand_controller.get).get('/:id', brand_controller.get).post('/', brand_controller.post).put('/:id', brand_controller.put).delete('/:id', brand_controller.delete)