import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: null,
    },
    roles: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required: true,
    },
    passwordChangedAt:{
        type: Date,
        default: Date.now,
    }
});

export const UserModel = mongoose.model('User', userSchema, 'users');