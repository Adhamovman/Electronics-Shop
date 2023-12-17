import { Router } from "express";
import { order_controller } from "../controllers/order.controller.js";


export const order_router = Router();
order_router.get('/', order_controller.get).get('/me/:token', order_controller.getUserOrder).get('/:id', order_controller.get).post('/', order_controller.post).put('/:id', order_controller.put).delete('/:id', order_controller.delete)