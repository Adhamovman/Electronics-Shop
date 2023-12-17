
import { Schema, Types, model } from "mongoose";

const commentSchema = new Schema({
    user_ref_id: {
         type: Types.ObjectId,
         ref: "users"
    },
    pro_ref_id: {
        type: Types.ObjectId,
        ref: "products"
   
    },
    store_ref_id: {
        type: Types.ObjectId,
        ref: "users"
    },
    text: {
        type: String,
        required: [true, "Comment must be enabled!"]
    }
});

export const comment_schema = model('comments', commentSchema);