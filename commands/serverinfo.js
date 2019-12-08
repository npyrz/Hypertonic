
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let sicon = bot.user.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information:")
    .setColor("#FF0000")
    .setThumbnail(sicon)
    .addField("Server Name:", message.guild.name)
    .addField("Created:", message.guild.createdAt)
    .addField("Members:", message.guild.memberCount)
    .setFooter("Hypertonic Developers")
    .setTimestamp();

    message.channel.send(serverembed);
}
module.exports.help = {
  name:"serverinfo"
}