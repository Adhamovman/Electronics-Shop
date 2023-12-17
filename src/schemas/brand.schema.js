
import { Schema, model } from "mongoose";

const brandSchema = new Schema({
    brand_name: {
        type: String,
        required: [true, "Brand name must be enabled!"]
    },
    logo: {
        type: String,
        required: [true, "Brand name must be enabled!"]
    },
    products: {
        type: Array,
        ref: "products"
    }
});

export const brand_schema = model('brands', brandSchema);