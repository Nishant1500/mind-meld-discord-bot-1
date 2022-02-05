const Discord = require('discord.js')
const User = require('../../database/schemas/lobby')
const Lobby = require('../../database/schemas/lobby')
const { error, success, blurple } = require('../../utils/colors')

module.exports = {
    name: 'exit',
    description: 'Exits the game lobby of mind meld',
    aliases: ['leave'],

    async execute(message, args) {
        const details = await Lobby.countDocuments({ discordId: message.author.id }, { limit: 1 })
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
                const embed = new Discord.MessageEmbed()
                    .setDescription(`You aren't even in the lobby`)
                    .setColor(blurple)
                message.reply({ embeds: [embed] })
            }
            else {
                Lobby.deleteOne({ discordId: message.author.id }, (err, response) => {
                    if (err) {
                        const embed = new Discord.MessageEmbed()
                            .setDescription(`An error occurred\nThe error: ${err}`)
                            .setColor(error)
                        message.reply({ embeds: [embed] })
                    }
                    else {
                        const embed = new Discord.MessageEmbed()
                            .setDescription(`Successfully removed <@${message.author.id}> from the game lobby`)
                            .setColor(success)
                        message.reply({ embeds: [embed] })
                    }
                })
            }
        }
    },
};