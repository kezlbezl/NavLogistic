const mongoose = require('mongoose');
const model = require('../models/Account');
const config = require('../../config.json');

const Account = mongoose.model('Account');

module.exports = {
    setUpConnection() {
        mongoose.connect(
            `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
                useMongoClient: true
            }
        )
    },
    getAccountList() {
        return Account.find();
    },
    createAccount(data) {
        const account = new Account({
            login: data.login,
            password: data.password,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            createdAt: new Date()
        });
        return account.save();
    },
    deleteAccount(id) {
        return Account.findById(id).remove();
    }
}