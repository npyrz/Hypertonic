const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let uUser = message.mentions.members.first() || message.member;


  let botembed = new Discord.MessageEmbed()
    .setAuthor(`${uUser.displayName}'s Avatar`, uUser.user.displayAvatarURL())
    .setColor("#0e2b82")
    .setImage(uUser.user.displayAvatarURL())
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name: "avatar"
}