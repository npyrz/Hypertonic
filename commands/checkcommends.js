const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client, message, args) => {
    let checkuser = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0])
    let commends = db.get(`commends_${message.guild.id}_${checkuser.id}`)
    if (commends === null) commends = 0;
    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`${checkuser} has a total of ${commends} commend(s)!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
}
module.exports.help = {
    name: "checkcommends"
}