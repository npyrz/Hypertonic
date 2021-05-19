const Discord = require('discord.js')
const db = require("quick.db")
module.exports.run = async(bot, message, args) => {
    let LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        message.channel.send(`:x: Could not find a Logging Channel. Please set one with the \`\`setlogs\`\` Command!`)
    } else {
        message.channel.send(`The current Logging Channel is set to <#${LoggingChannel}>`)
    }
}
module.exports.help = {
    name: "loggingchannel"
}