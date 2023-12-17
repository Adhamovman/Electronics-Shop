
import { Schema, model } from "mongoose";

const discountSchema = new Schema({
    disc_name: {
        type: String,
        required: [true, "Discount name must be enabled!"]
    },
    disc_percent: {
        type: Number,
        required: [true, "Discount percent must be enabled!"]
    },
    products: {
        type: Array,
        ref: "products"
    }
});

export const discount_schema = model('discounts', discountSchema);