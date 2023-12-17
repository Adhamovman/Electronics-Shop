import { position_schema } from "../schemas/position.schema.js";

class positionModel {
    async select(id) {
        return id ? await position_schema.findById(id) : position_schema.find();
    }
    async create(body) {
        return await position_schema.create(body);
    }
    async update(id, body) {
        return await position_schema.findByIdAndUpdate(id, body, { new: true });
    }
    async remove(id) {
        return await position_schema.findByIdAndRemove(id);
    }
}

export const position_model = new positionModel();