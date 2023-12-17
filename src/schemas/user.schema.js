import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        max: 50,
        required: [true, 'Please enter a username!']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address!'],
        unique: true,
    },
    avatar: {
        type: String,
        default: "/image/user.png"
    },
    contact: {
        type: String,
        required: [true, 'Please enter a contact'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        min: 4
    },
    orders: {
        type: Array,
        ref: 'orders',
    },
    pos_ref_id: {
        type: Types.ObjectId,
        default: "64f8b8d559a352f22d1b6163",
        ref: "positions"
    },
    my_comments: {
        type: Array,
        ref: "comments"
    },
    deleted_at: {
        type: Date,
    }
}, {
    timestamps: {
        updatedAt: false,
        createdAt: "created_at"
    },
    strictPopulate: false,
});

export const user_schema = model('users', userSchema);