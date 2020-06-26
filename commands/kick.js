const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry you don't have permission to kick!").then(m => {
    m.delete(15000)
  });
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser) return message.channel.send("Can't find the user!").then(m => {
    m.delete(1000)
  });
  let kReason = args.join(" ").slice(22);
  if (!kReason) return message.channel.send("Please enter the reason for the kick!").then(m => {
    m.delete(15000)
  });
  if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry that user can not be kicked!").then(m => {
    m.delete(10000)
  });
  message.channel.send(`${kUser} has been kicked!`)


  let kickEmbed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .addField("Kicked User", `${kUser} ID: ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp()
    .addField("Reason", kReason);

  let sChannel = message.guild.channels.cache.find(channel => channel.name === "bot-logs")
  message.guild.member(kUser).kick(kReason);
  sChannel.send(kickEmbed)

}
module.exports.help = {
  name: "kick"
}