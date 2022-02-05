const Discord = require('discord.js')
const Lobby = require('../../database/schemas/lobby')
const Round = require('../../database/schemas/round')
const { error, success, blurple } = require('../../utils/colors')
const randomObject = require('../../utils/randomObject')
const randomTopics = require('../../data/randomTopics')

module.exports = {
    name: 'start',
    description: 'Starts a round of mind meld',
    aliases: ['start'],

    async execute(message, args) {
        if (message.author.bot) return;
        // 0 means the user isn't there in the lobby, 1 means the user is there in the lobby
        const isInLobby = await Lobby.countDocuments({ discordId: message.author.id }, {
            limit: 1
        })
        if (isInLobby === 1) {
            const newRoundUser = new Round({
                discordId: message.author.id
            })
            newRoundUser.save()
            const randomTopicEmbed = new Discord.MessageEmbed()
                .setDescription(`Here is a random topic **${randomObject(randomTopics)}**\nTo guess, send a message with your guess in it`)
                .setColor(blurple)
            message.reply({ embeds: [randomTopicEmbed] })
            const filter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 1000 * 30 // 30s
            })
            collector.on('collect', async m => {
                await Round.findOneAndUpdate({ discordId: m.author.id }, { response: m.content });
                const collectedEmbed = new Discord.MessageEmbed()
                    .setDescription(`Collected!`)
                    .setColor(success)
                await message.reply({ embeds: [collectedEmbed] })
            })
            collector.on('end', async m => {

            })

        }
        else {
            const embed = new Discord.MessageEmbed()
                .setDescription(`Hey! To continue playing please login into [mindmecord's discord dashboard](http://locahost:3000)`)
                .setColor(blurple)
            message.reply({ embeds: [embed] })
        }
    }
};