import { subcategory_model } from "../models/subcategory.model.js";

class subcategory {
    async get(req, res) {
        try {
            const { id } = req.params;
            
            let result = await subcategory_model.select(id);
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
            let result = await subcategory_model.create(req.body);
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
            let result = await subcategory_model.update(id, req.body);
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
            let result = await subcategory_model.remove(id);
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
}

export const subcategory_controller = new subcategory();