const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setDescription(' If your interested in donating do the following instructions! Join the discord and type *donate* or go to the website below ⬇⬇⬇ !')
    .addField("Website Link:", "[Click Here](https://donatebot.io/checkout/664947865390415882?buyer=395383087531425793)")
    .setImage("https://cdn.discordapp.com/attachments/664968617816883261/667156445380214784/tenor.gif")
    .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name: "donate"
}