import { category_schema } from "../schemas/category.schema.js";
import { subcategory_schema } from "../schemas/subcategory.schema.js";

class subcategoryModel {
    async select(id) {
        return id ? await subcategory_schema.findById(id) : subcategory_schema.find().populate("cat_ref_id");
    }
    async create(body) {
        const { cat_ref_id } = body;
        let data = await subcategory_schema.create(body);
        await category_schema.findByIdAndUpdate(cat_ref_id, { $push: { subcategories: data._id } })
        return data;
    }
    async update(id, body) {
        return await subcategory_schema.findByIdAndUpdate(id, body, { new: true });
    }
    async remove(id) {
        return await subcategory_schema.findByIdAndRemove(id);
    }
}

export const subcategory_model = new subcategoryModel();