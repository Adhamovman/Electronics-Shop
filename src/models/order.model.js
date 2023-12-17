import { order_schema } from "../schemas/order.schema.js";
import { product_schema } from "../schemas/product.schema.js";
import { user_schema } from "../schemas/user.schema.js";

class orderModel {
    async select(id) {
        return id ? await order_schema.findById(id).populate("user_ref_id").populate("products") : order_schema.find().populate("user_ref_id").populate("products");
    }
    async user_order(user_ref_id) {
        return await order_schema.find({ user_ref_id }).populate("products").populate("user_ref_id");
    }
    async create(user_ref_id, products) {
        await product_schema.updateMany({ _id: { $in: products } }, { $inc: { orders: 1 } });
        let order = await order_schema.create({ user_ref_id, products });
        await user_schema.findByIdAndUpdate(user_ref_id, { $push: { orders: order._id } })
        return order;
    }
    async update(id, body) {
        return await order_schema.findByIdAndUpdate(id, body, { new: true });
    }
    async remove(id) {
        return await order_schema.findByIdAndUpdate(id, { deleted_at: new Date() }, { new: true });
    }
}

export const order_model = new orderModel();

// console.log( await product_schema.updateMany({ _id: { $in: ["64ffa8c002e21fd6602bfb7f"] } }, { $set: { orders: orders++ } }));