import { Router } from "express";
import { product_controller } from "../controllers/product.controller.js";
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })




export const product_router = Router();
product_router.get('/', product_controller.get).get('/:id', product_controller.get).post('/:id', upload.single('image'), function (req, res, next) {
    console.log(req.body, req.files);
}
).post('/', product_controller.post).put('/:id', product_controller.put).delete('/:id', product_controller.delete)