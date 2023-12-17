import { order_model } from "../models/order.model.js";
import { user_model } from "../models/user.model.js";

class order {
    async get(req, res) {
        try {
            const { id } = req.params;
            let data = await order_model.select(id);
            if (typeof data == 'string') throw new Error(data);
            res.send({
                status: 200,
                message: "Success",
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
    async getUserOrder(req, res) {
        try {
            let { token } = req.params;
            let id = await user_model.check(token);
            let data = await order_model.user_order(id);
            if (typeof data == 'string') throw new Error(data);
            res.send({
                status: 200,
                message: "Success",
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
    async post(req, res) {
        try {
            let { token, orders } = req.body;
            let id = await user_model.check(token);

            let data = await order_model.create(id, orders);
            if (typeof data == 'string') throw new Error(data);

            res.send({
                status: 201,
                message: "Success",
                data
            });
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
            let result = await order_model.update(id, req.body);
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
            let data = await order_model.remove(id);
            if (typeof data == 'string') throw new Error(data);
            res.send({
                status: 201,
                message: "Success",
                data
            });
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
}

export const order_controller = new order();