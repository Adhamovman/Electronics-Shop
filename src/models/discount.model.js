import { discount_schema } from "../schemas/discount.schema.js";

class discountModel {
    async select(id) {
        return id ? await discount_schema.findById(id) : discount_schema.find();
    }
    async create(body) {
        return await discount_schema.create(body);
    }
    async update(id, body) {
        return await discount_schema.findByIdAndUpdate(id, body, { new: true });
    }
    async remove(id) {
        return await discount_schema.findByIdAndRemove(id);
    }
}

export const discount_model = new discountModel();