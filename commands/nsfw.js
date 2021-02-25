const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let botembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setTitle("🍆__**NSFW**__🍆")
    .setImage(`https://media.tenor.co/videos/b1a469475cc2b4bd7f4f6d1768f59df1/mp4`)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(botembed);
};

module.exports.help = {
  name: "nsfw"
};
