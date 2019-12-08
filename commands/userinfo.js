const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    let uEmbed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.author.username} Information`, message.author.displayAvatarURL)
    .addField("**Username:**", `${message.author.username}`, true)
    .addField("**ID:**", `${message.author.id}`, true)
    .addField("**Joined**", `${message.member.joinedAt}`, true)
    .addField("**Status:**", `${message.author.presence.status}`, true)
    .addField("**Account Created:**", `${message.author.createdAt}`, true)
    .setFooter("Hypertonic Developers")
    .setTimestamp();
    message.channel.send({embed: uEmbed});
}
module.exports.help = {
    name:"userinfo"
  }