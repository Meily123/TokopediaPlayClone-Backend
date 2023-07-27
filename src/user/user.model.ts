const mongoose = require('mongoose');

export const collectionName = 'users';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String, required: true },
    token: { type: String },
});

export const User = mongoose.model(
    collectionName,
    userSchema
);
