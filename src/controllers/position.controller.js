import { position_model } from "../models/position.model.js";

class position {
    async get(req, res) {
        try {
            const { id } = req.params;
            let result = await position_model.select(id, req.query);
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
            let result = await position_model.create(req.body);
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
            let result = await position_model.update(id, req.body);
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
            let result = await position_model.remove(id);
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

export const position_controller = new position();