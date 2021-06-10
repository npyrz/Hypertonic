const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("SEND_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, you don't have permission to promote your stream!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  
  let stream = message.guild.member(message.author || message.guild.members.get(args[0]));
  let reason = args.slice(0).join(" ");
  if (!reason) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`Incorrect Usage`)
  .setDescription("Correct Usage: ``startstream (Stream URL)``")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  message.channel.send(new Discord.MessageEmbed()
  .setDescription(`${stream} is now **🛑LIVE🛑** check out their stream *${reason}* !`)
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

  let streamembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .addField("User Steaming:", `<@${message.author.id}>`)
    .addField("Link:", reason)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setThumbnail("https://cdn.discordapp.com/attachments/693317100596363274/713748213185773598/tenor.gif")
    .setTimestamp()

    let channel = message.guild.channels.cache.find(channel => channel.name === 'streams');
    if (!channel) return message.channel.send(new Discord.MessageEmbed()
    .setDescription("Please create a `steams` channel first!")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    .then(m => m.delete({ timeout: 30000 }));
    channel.send(streamembed);

}
module.exports.help = {
  name: "startsteam"
}