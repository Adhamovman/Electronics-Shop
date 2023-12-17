import { comment_model } from "../models/comment.model.js";

class comment {
    async get(req, res) {
        try {
            const { id } = req.params;
            let result = await comment_model.select(id, req.query);
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
            let result = await comment_model.create(req.body);
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
            let result = await comment_model.update(id, req.body);
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
            let result = await comment_model.remove(id);
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

export const comment_controller = new comment();