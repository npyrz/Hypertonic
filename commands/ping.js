const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client, message, args) => {
    let LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.reply(`Please set a Logging Channel with \`\`setlogs\`\` Command!`)
    }

    client.channels.cache.get(LoggingChannel).send(`Ping Command Used by ${message.author}`)
}
module.exports.help = {
    name: "ping"
}