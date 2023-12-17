import { Router } from "express";
import { discount_controller } from "../controllers/discount.controller.js";


export const discount_router = Router();
discount_router.get('/', discount_controller.get).get('/:id', discount_controller.get).post('/', discount_controller.post).put('/:id', discount_controller.put).delete('/:id', discount_controller.delete)