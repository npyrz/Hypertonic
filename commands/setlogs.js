const Discord = require('discord.js')
const db = require("quick.db")
module.exports.run = async(client, message, args) => {
    let permission = message.member.hasPermission("MANAGE_CHANNELS");
    if (!permission) return message.channel.send(":x: You are missing the permission `MANAGE_CHANNELS`")
    let LoggingChannel = args[0]
    if (isNaN(LoggingChannel)) return message.channel.send("You must specify a valid Channel ID for the Logging Channel!")
    try {
        client.channels.cache.get(LoggingChannel).send(":white_check_mark: Server Logging Channel bound here!")
        db.set(`loggingchannel_${message.guild.id}`, LoggingChannel)
        message.channel.send(":white_check_mark: You have successfully set the Logging Channel to <#" + LoggingChannel + ">")
    } catch (e) {
        console.log(e)
        return message.channel.send(":x: Error!")
    }


}
module.exports.help = {
    name: "setchannel"
}