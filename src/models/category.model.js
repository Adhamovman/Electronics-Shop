import { category_schema } from "../schemas/category.schema.js";

class categoryModel {
    async select(id, filter) {
        const { cat_name } = filter;
        return id ? await category_schema.findById(id).populate('subcategories') : cat_name ? await category_schema.findOne({ cat_name }).populate("subcategories") : category_schema.find();
    }
    async create(body) {
        return await category_schema.create(body);
    }
    async update(id, body) {
        return await category_schema.findByIdAndUpdate(id, body, { new: true });
    }
    async remove(id) {
        return await category_schema.findByIdAndRemove(id);
    }
}

export const category_model = new categoryModel();