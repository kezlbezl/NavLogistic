const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ManagerSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date
    }
});
const Manager = mongoose.model('Manager', ManagerSchema);