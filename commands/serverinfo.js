const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let serverembed = new Discord.MessageEmbed()
    .setAuthor("Server Information:")
    .setColor("#0e2b82")
    .addField("**Server Name:**", message.guild.name)
    .addField("**Server ID:**", message.guild.id)
    .addField("**Created:**", message.guild.createdAt)
    .addField("**Channels:**", message.guild.channels.size, true)
    .addField(
      "**Server Owner:**",
      `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`
    )
    .addField(
      "**Total Members:** | **Humans:** | **Bots:**",
      `${message.guild.members.size} | ${
    message.guild.members.filter(member => !member.user.bot).size
    } | ${message.guild.members.filter(member => member.user.bot).size}`,
      true
    )
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(serverembed);
}
module.exports.help = {
  name: "serverinfo"
}