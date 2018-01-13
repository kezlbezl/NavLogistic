const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    deviceTypes: {
        type: [String],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date
    }
}, {
    collection: 'OrderCollection'
});
const Order = mongoose.model('Order', OrderSchema);