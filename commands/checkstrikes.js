const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

let strikes = JSON.parse(fs.readFileSync("./strikes.json", "utf8"));
module.exports.run = async (bot, message, args) => {

    let strikeuser = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0])
    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`${strikeuser} has a total of ${strikes[strikeuser.id].warns} strike(s)!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
}

module.exports.help = {
    name: "checkstrikes"
  }