const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    fullName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'AccountCollection'
});
AccountSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew()) {
        this.password = bcrypt.hashSync(this.password, 12);
        next();
    }
})
const Account = mongoose.model('Account', AccountSchema);