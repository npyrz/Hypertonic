const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete();

  var coin = [
    "Heads",
    "Tails",
  ];
  var response = coin[Math.floor(Math.random() * coin.length).toString(16)];

  let botembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .addField(`${message.author.username} flipped...`,
      response)
    .setThumbnail("https://cdn.discordapp.com/attachments/708353767233552498/761969671493910578/5291f56897d748b1ca0a10c90023588d.gif")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑");

  message.channel.send(botembed);
}

module.exports.help = {
  name: "coinflip"
}