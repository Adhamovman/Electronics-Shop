import { Router } from "express";
import { user_controller } from "../controllers/user.controller.js";

export const auth_router = Router();
auth_router.post('/login', user_controller.login).post('/register', user_controller.register)