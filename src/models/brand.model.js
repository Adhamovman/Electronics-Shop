import { brand_schema } from "../schemas/brand.schema.js";

class brandModel {
    async select(id, filter) {
        const { brand_name } = filter;
        return id ? await brand_schema.findById(id) : brand_name ? await brand_schema.findOne({ brand_name }) : brand_schema.find();
    }
    async create(body) {
        return await brand_schema.create(body);
    }
    async update(id, body) {
        return await brand_schema.findByIdAndUpdate(id, body, { new: true });
    }
    async remove(id) {
        return await brand_schema.findByIdAndRemove(id);
    }
}

export const brand_model = new brandModel();