const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Number
    }
})

module.exports = mongoose.model('User', UserSchema, 'User')