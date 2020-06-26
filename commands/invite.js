const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setDescription(' If your interested in inviting Hypertonic to a server use the link below! Also make sure to join the Support Server for any help!')
    .addField("Website Link:", "[Click Here](https://top.gg/bot/617784753482891316)")
    .addField("Support Server Link:", "[Click Here](https://discord.gg/VjCxgr2)")
    .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name: "invite"
}