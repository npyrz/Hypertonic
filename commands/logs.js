const Discord = require('discord.js')
const db = require("quick.db")
module.exports.run = async(bot, message, args) => {
    let LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
            message.channel.send(new Discord.MessageEmbed()
            .setDescription("Sorry, couldn't find a set logging channel for moderation commands, please set one up with the \`\`setlogs\`\` command!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    } else {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`The current moderation logging channel is set to <#${LoggingChannel}>!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
}
module.exports.help = {
    name: "logs"
}