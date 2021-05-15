const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let duration = args[0];
  if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Please specify the amount of time you want slowmode to be! `[prefix]slowmode [TIME]`")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, you don't have permission to use slowmode!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  

  message.channel.setRateLimitPerUser(duration);
  message.channel.send(new Discord.MessageEmbed()
  .setDescription("Slowmode has been set to " + "`" + duration + "`" + " !")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

  let muteembed = new Discord.MessageEmbed()
        .setTitle(`Slowmode`)
        .setColor("#0e2b82")
        .addField("Slowmode By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Slowmode In:", message.channel)
        .addField("Slowmode Amount:", duration)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();

        let channel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
        if (!channel) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Please create a `bot-logs` channel first!")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }));
        channel.send(muteembed);

}
module.exports.help = {
name: 'slowmode'
}