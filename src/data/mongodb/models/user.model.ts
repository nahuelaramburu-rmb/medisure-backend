import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    full_name: {
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
    department_clinic: {
        type: String,
        default: 'NO_DEPARTMENT',
    },
    roles: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['SUPER_ADMIN', 'DEPARTMENT_ADMIN','RESEARCHER','VIEWER', 'USER_ROLE'],
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