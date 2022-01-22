const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image_url: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    balance: {
        type: Number,
        default: 200
    },
    earning: {
        type: Number,
        default: 0
    },
    isNewUser: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    country: {
        type: String,
    },
    referred_user: {
        type: Array
    },
    referral_code: {
        type: String,
    },
    referred_through: {
        type: String,
    },
    lastVisit: {
        type: String,
    },
    type: {
        type: String,
        default: 'user'
    },
    notification: {
        type: Array,
        default: ["🦄 Wow, You've won 200 Neuron coins! 🥳"]
    },
    Tokens: [{
        token: {
            type: String,
            required: true
        }
    }
    ]
}, { timestamps: true })


const User = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = User;