const mongoose = require('mongoose')

const RoundSchema = mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    response: {
        type: String
    }
})

module.exports = mongoose.model('Round', RoundSchema, 'Round')