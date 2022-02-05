const mongoose = require('mongoose')

const LobbySchema = mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Lobby', LobbySchema, 'Lobby')