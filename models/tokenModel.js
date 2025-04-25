const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;