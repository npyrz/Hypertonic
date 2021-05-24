const Discord = require('discord.js')
const db = require("quick.db")
module.exports.run = async(client, message, args) => {
    let permission = message.member.hasPermission("MANAGE_CHANNELS");
    if (!permission) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Sorry, you don't have permission to set the moderation logging channel!`)
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    let LoggingChannel = args[0]
    if (isNaN(LoggingChannel)) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`You must specify a valid channel ID for the logging channel!`)
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    try {
        client.channels.cache.get(LoggingChannel).send(new Discord.MessageEmbed()
        .setDescription(`Server logging channel set here!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
         db.set(`loggingchannel_${message.guild.id}`, LoggingChannel)
        message.channel.send(new Discord.MessageEmbed()
        .setDescription("You have successfully set the logging channel to <#" + LoggingChannel + ">")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    } catch (e) {
        console.log(e)
        return message.channel.send(":x: Error!")
    }
}
module.exports.help = {
    name: "setlogs"
}