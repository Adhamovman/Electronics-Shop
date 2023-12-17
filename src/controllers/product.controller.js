import { product_model } from "../models/product.model.js";

class product {
    async get(req, res) {
        try {
            const { id } = req.params;
            let result = await product_model.select(id, req.query);
            if (typeof result == 'string') throw new Error(result);
            res.send(result)
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async post(req, res) {
        try {
            let result = await product_model.create(req.body);
            if (typeof result == 'string') throw new Error(result);

            res.send(result);
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async put(req, res) {
        try {
            const { id } = req.params;
            let result = await product_model.update(id, req.body);
            if (typeof result == 'string') throw new Error(result);
            res.send(result);
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            let data = await product_model.remove(id);
            if (typeof data == 'string') throw new Error(data);
            res.send({
                status: 200,
                message: "success",
                data
            })
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async post_img(req, res) {
        try {
            const { id } = req.params;
            let filename = "/uploads/" + req.file.filename;
            let data = await product_model.post_img(id, filename);
            if (typeof data == 'string') throw new Error(data);
            res.redirect('http://localhost:4000/product')
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
}

export const product_controller = new product();