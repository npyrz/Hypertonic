const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
    .setTitle("**__Hypertonic Coming Soon Features__**")
    .setColor("#0e2b82")
    .addField("The following are some planned features for **Hypertonic**!",
      "`Check amount of strikes/commmends a user has | XP System | More Fun Commands | Music Features`", )
    .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name: "comingsoon"
}