const Discord = require("discord.js");
const fs = require("fs");

let jsonfile = JSON.parse(fs.readFileSync("./commend.json", "utf8"));
module.exports.run = async (bot, message, args) => {

    let commenduser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    
    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`${commenduser} has a total of ${jsonfile[commenduser.id].commends} commend(s)!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
}

module.exports.help = {
    name: "checkcommends"
  }