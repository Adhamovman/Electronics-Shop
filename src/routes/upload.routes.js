import { Router } from "express";
import { UPLOAD } from "../utils/multer.js";
import multer from "multer";
import { product_controller } from "../controllers/product.controller.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads')
    },
    filename: function (req, file, cb) {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })

export const upload_router = Router();
upload_router.post('/products/:id', upload.single('file'), product_controller.post_img ).post('/brands/:id', upload.single('file'), UPLOAD).post('/users/:id', upload.single('file'), UPLOAD).post('/categories/:id', upload.single('file'), UPLOAD).post('/subcategories/:id', upload.single('file'), UPLOAD).post('/stores/:id', upload.single('file'), UPLOAD)
