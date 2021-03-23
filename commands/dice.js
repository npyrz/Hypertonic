const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  var response = [Math.floor(Math.random() * (6 - 1 + 1) + 1)];
  let botembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .addField(`${message.author.username} rolled a ...`,
      response)
    .setThumbnail("https://cdn.discordapp.com/attachments/647578527293505545/713500403718684793/ElatedImpartialArmadillo-max-1mb.gif")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")

  message.channel.send(botembed);
}
module.exports.help = {
  name: "dice"
}