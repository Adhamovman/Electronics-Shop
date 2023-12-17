import { Router } from "express";
import { user_controller } from "../controllers/user.controller.js";


export const user_router = Router();
user_router.get('/', user_controller.get).get('/confirm/:token', user_controller.getU).get('/:id', user_controller.get).put('/:id', user_controller.put).delete('/:id', user_controller.delete).post('/login', user_controller.login).post('/register', user_controller.register).post("/forgotPassword", user_controller.sendPassword).post("/check/:pass", user_controller.checkPassword).put("/addadmin/:id", user_controller.addadmin);