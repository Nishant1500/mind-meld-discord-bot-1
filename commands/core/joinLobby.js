const Discord = require('discord.js')
const User = require('../../database/schemas/user')
const Lobby = require('../../database/schemas/lobby')
const { error, success, blurple } = require('../../utils/colors')

module.exports = {
    name: 'lobby',
    description: 'Join the game lobby of mind meld',
    aliases: ['join'],

    async execute(message, args) {
        const details = await Lobby.countDocuments({ discordId: message.author.id }, { limit: 1 })
        // 0 means the user isn't there in the lobby, 1 means the user is there in the lobby
        const isLogged = await User.countDocuments({ discordId: message.author.id }, {
            limit: 1
        })
        if (isLogged === 0) {
            const embed = new Discord.MessageEmbed()
                .setDescription(`Please login into [mindmecord](https://mind-meld-backend-production.up.railway.app/)'s dashboard to continue`)
                .setColor(blurple)
            message.reply({ embeds: [embed] })
        }
        else {
            if (details === 0) {
                const newLobbyUser = new Lobby({
                    discordId: message.author.id
                })
                newLobbyUser.save()
                const embed = new Discord.MessageEmbed()
                    .setDescription(`Successfully added <@${message.author.id}> to the game lobby\nUse \`-start\` to start a round of mind meld game`)
                    .setColor(success)
                message.reply({ embeds: [embed] })
            }
            else {
                const embed = new Discord.MessageEmbed()
                    .setDescription(`You're added there in the game lobby\nUse\`-start\` to start a round of mind meld game`)
                    .setColor(blurple)
                message.reply({ embeds: [embed] })
            }
        }
    }
}