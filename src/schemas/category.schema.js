
import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    cat_name: {
        type: String,
        min: 3,
        max: 50,
        required: [true, "Category name must be enabled!"]
    },
    cat_img: {
        type: String,
        required: [true, "Category img must be enabled!"]
    },
    subcategories: {
        type: Array,
        ref: "subcategories"
    },
    products: {
        type: Array,
        ref: "products"
    }
});

export const category_schema = model('categories', categorySchema);