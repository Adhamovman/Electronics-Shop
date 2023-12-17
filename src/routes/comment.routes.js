import { Router } from "express";
import { comment_controller } from "../controllers/comment.controller.js";


export const comment_router = Router();
comment_router.get('/', comment_controller.get).get('/:id', comment_controller.get).post('/', comment_controller.post).put('/:id', comment_controller.put).delete('/:id', comment_controller.delete)