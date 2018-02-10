const mongoose = require('mongoose');

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
    /* firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, */
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
AccountSchema.pre('create', function(next) {
    if (this.isModified('password') || this.isNew()) {
        this.password
    }
})
const Account = mongoose.model('Account', AccountSchema);