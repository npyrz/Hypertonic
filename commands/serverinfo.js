const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let serverembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setTitle(`${message.guild.name}\'s Information`)
    .addField("Guild ID", message.guild.id, false)
    .addField("Server Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, false)
    .addField("Created", `${require('moment')(message.guild.createdAt).format('ddd, MMMM Do YYYY [at] hh:mm A')} | ${require('moment')(message.guild.createdAt).fromNow()}`, false)
    .addField("Server Region", message.guild.region, false)
    .addField("Members", message.guild.memberCount, false)
    .addField("Channels", message.guild.channels.cache.size, false)
    .addField("Roles", message.guild.roles.cache.size, false)
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`)
    .setTimestamp();

  message.channel.send(serverembed);
}
module.exports.help = {
  name: "serverinfo"
}
