import { Router } from "express";
import { position_controller } from "../controllers/position.controller.js";

export const position_router = Router();
position_router.get('/', position_controller.get).get('/:id', position_controller.get).post('/', position_controller.post).put('/:id', position_controller.put).delete('/:id', position_controller.delete)