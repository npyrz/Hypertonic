const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry you don't have permission to ban!").then(m => {
    m.delete({timeout: 15000})
  });
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return message.channel.send("Can't find user!").then(m => {
    m.delete({timeout: 10000})
  });
  let bReason = args.slice(1).join(` `);
  if (!bReason) return message.channel.send("Please given a reason for the user to be banned!").then(m => {
    m.delete({timeout: 15000})
  });
  if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry that user can not be banned!").then(m => {
    m.delete({timeout: 10000})
  });
  bUser.ban(bUser, {
    bReason: bReason
  })
  message.channel.send(`${bUser} has been banned!`)

  let banEmbed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .addField("Banned User:", `${bUser} ID: ${bUser.id}`)
    .addField("Banned By:", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Banned In:", message.channel)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp()
    .addField("Reason:", bReason);

  let sChannel = message.guild.channels.cache.find(channel => channel.name === "bot-logs")
  message.guild.member(bUser).ban();
  sChannel.send(banEmbed)
}


module.exports.help = {
  name: "ban"
}