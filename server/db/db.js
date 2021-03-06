const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);
const model = require('../models/Account');
const config = require('../../config.json');
const _ = require('lodash');
const { createToken } = require('./../authentication/authentication.js')

const Account = mongoose.model('Account');

function findAccountByProperty(login) {
    return Account
        .find({ // improve FindOne!
            login: {
                $regex: _.escapeRegExp(login),
                $options: 'i'
            }
        })
        .lean()
        .exec((err, accountList) => {
            if (err) return console.error('AccountCollection: findAccountByProperty', err);
        });
}

module.exports = {
    setUpConnection() {
        mongoose.connect(
            `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
                useMongoClient: true
            }
        )
    },
    findAccountByProperty,
    getAccountList() {
        return Account
            .find({})
            .lean()
            .exec((err, accountList) => {
                if (err) return console.error('AccountCollection', err);
            });
    },
    createAccount(data) {
        return findAccountByProperty(data.login)
            .then((match) => {
                if (match.length > 0) {
                    console.warn(`Find match Account ${JSON.stringify(match)}`);
                    throw new Error(`Find match Account`);
                } else {
                    const account = new Account({
                        login: data.login,
                        password: data.password,
                        role: data.role,
                        email: data.email,
                        fullName: data.fullName,
                        description: data.description,
                        createdAt: new Date()
                    });
                    return account.save((err) => {
                            if (err) return console.error('AccountCollection', err);
                        })
                        .then(newAccount => {
                            const token = createToken({ id: newAccount._id, login: newAccount.login });
                            return Promise.resolve({ newAccount, token });
                        });
                }
            })
            // .catch((error) => { console.warn('findAccountByProperty error', error); });

    },
    deleteAccount(id) {
        return Account.findById(id).remove(err => {
            if (err) return console.error('AccountCollection', err);
        });
    }
}