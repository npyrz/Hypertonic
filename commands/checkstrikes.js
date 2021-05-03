const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client, message, args) => {
    let strikeuser = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0])
    let strikes = db.get(`strikes_${message.guild.id}_${strikeuser.id}`)
    if (strikes === null) strikes = 0;
    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`${strikeuser} has a total of ${strikes} strikes(s)!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
}
module.exports.help = {
    name: "checkstrikes"
}