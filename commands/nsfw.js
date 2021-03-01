const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let botembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setTitle("🍆__**NSFW**__🍆")
    .setImage("https://tenor.com/view/coconut-coconut-malled-coconut-mall-mario-kart-lovro-the-coolest-gif-20290663")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(botembed);
};

module.exports.help = {
  name: "nsfw"
};
