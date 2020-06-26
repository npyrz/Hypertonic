const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let botembed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}'s Avatar`, message.author.displayAvatarURL())
    .setColor("#0e2b82")
    .setImage(message.author.displayAvatarURL())
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name: "avatar"
}