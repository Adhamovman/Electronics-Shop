
import { Schema, Types, model } from "mongoose";

const subcategorySchema = new Schema({
    cat_ref_id: {
        type: Types.ObjectId,
        ref: "categories"
    },
    sub_name: {
        type: String,
        min: 3,
        max: 50,
        required: [true, "Subcategory name must be enabled!"]
    },
    sub_img: {
        type: String,
        required: [true, "Subcategory img must be enabled!"]
    },
    products: {
        type: Array,
        ref: 'products'
    }
});

export const subcategory_schema = model('subcategories', subcategorySchema);