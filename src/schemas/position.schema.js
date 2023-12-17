
import { Schema, model } from "mongoose";

const positionSchema = new Schema({
    pos_name: {
        type: String,
        required: [true, "Position name must be enabled!"]
    }
});

export const position_schema = model('positions', positionSchema);