const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId
    },
    name: {
        type: String,
    },
    image_url: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
    },
    isVerified: {
        type: Boolean,
    },
    country: {
        type: String,
    },
    type: {
        type: String,
        default: 'user'
    },
    coins: {
        type: Number,
        required: true
    },
    crypto: {
        type: String
    },
    wallet: {
        type: String,
        required: true
    }
    
}, { timestamps: true })


const Withdraw = mongoose.models.Withdraw || mongoose.model('Withdraw', withdrawSchema)

module.exports = Withdraw;