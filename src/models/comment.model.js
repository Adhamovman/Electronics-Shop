import { comment_schema } from "../schemas/comment.schema.js";
import { product_schema } from "../schemas/product.schema.js";
import { user_schema } from "../schemas/user.schema.js";

class commentModel {
    async select(id) {
        return id ? await comment_schema.findById(id) : comment_schema.find();
    }
    async create(body) {
        let comment = await comment_schema.create(body);
        const { pro_ref_id, _id, user_ref_id } = comment;
        await product_schema.findByIdAndUpdate(pro_ref_id, { $push: { comments: _id } });
        await user_schema.findByIdAndUpdate(user_ref_id, { $push: { my_comments: _id } });

        return comment;
    }
    async update(id, body) {
        return await comment_schema.findByIdAndUpdate(id, body, { new: true });
    }
    async remove(id) {
        return await comment_schema.findByIdAndRemove(id);
    }
}

export const comment_model = new commentModel();