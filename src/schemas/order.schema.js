
import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
    user_ref_id: {
        type: Types.ObjectId,
        ref: 'users'
    },
    products: {
        type: Array,
        ref: 'products'
    },
    deleted_at: {
        type: Date
    }
}, {
    timestamps: {
        updatedAt: false,
        createdAt: 'created_at'
    }
});

export const order_schema = model('orders', orderSchema);

// order = { username : user, orders: [{}, {}]}