const Discord = require("discord.js");
    module.exports.run = async (bot, message, args) => {
      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
  .setColor("#FF0000")
  .setDescription("**__Support Discord__** https://discord.gg/7QK4TVb ")
  .setImage("https://cdn.discordapp.com/attachments/635163040722976800/635180309033385984/210cc55c179bd56ab87c3c6e5e3cb50b2afa3146.webp")
  .setThumbnail("https://cdn.discordapp.com/attachments/633086365093068823/634963215570436096/2033dd42ec0782213771fa7c8c3e50c5.jpg")
  .setFooter("Nava Developers")
  .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name:"supportdiscord"
}