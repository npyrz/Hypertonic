const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let botembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setTitle("🍆__**NSFW**__🍆")
    .setImage("https://cdn.discordapp.com/attachments/666433515365072926/815816997308071976/tenor.gif")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(botembed);
};

module.exports.help = {
  name: "nsfw"
};