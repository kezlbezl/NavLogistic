const mongoose = require('mongoose');
const model = require('../models/Manager');

const Manager = mongoose.model('Manager');

module.exports = {
    setUpConnection() {
        mongoose.connect(`mongodb://localhost/manager`)
    },
    getManagerList() {
        return Manager.find();
    },
    createManger(data) {
        const manager = new Manager({
            login: data.login,
            password: data.password,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            createdAt: new Date()
        });
        return manager.save();
    },
    deleteManager(id) {
        return Manager.findById(id).remove();
    }
}