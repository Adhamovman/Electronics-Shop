
import { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
    pro_name: {
        type: String,
        min: 3,
        max: 255,
        required: [true, "Product name must be enabled!"]
    },
    sub_ref_id: {
        type: Types.ObjectId,
        ref: "subcategories"
    },
    cat_ref_id: {
        type: Types.ObjectId,
        ref: "categories"
    },
    link: {
        type: String,
        default: "/image/product.png"
    },
    price: {
        type: Number,
        required: [true, "Product price must be enabled!"]
    },
    pro_desc: {
        type: String,
        max: 512,
        required: [true, "Product description must be enabled!"]
    },
    disc_ref_id: {
        type: Types.ObjectId,
        ref: "discounts"
    },
    rating: {
        type: Number,
        default: 5,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    orders: {
        type: Number,
        default: 0,
    },
    brand_ref_id: {
        type: Types.ObjectId,
        ref: "brands",
        required: [true, "Product brand must be enabled!"]
    },
    amount: {
        type: Number,
        required: [true, "Product quantity must be enabled!"]
    },
    store_ref_id: {
        type: Types.ObjectId,
        ref: "users"
    },
    comments: {
        type: Array,
        ref: 'comments'
    }
});

export const product_schema = model('products', productSchema);