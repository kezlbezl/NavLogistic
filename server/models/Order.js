const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    equipment: [{
        deviceType: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    DDD: {
        type: String,
        required: true
    },
    deliveryMethod: {
        type: String,
        required: true
    },
    courierService: {
        type: String
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