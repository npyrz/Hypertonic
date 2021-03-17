const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete();

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`Sorry, you don't have permission to ban!`)
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))

  let bUser = message.guild.member(message.mentions.users.first());
  if (!bUser) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`Sorry, we can't find that user!`)
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  let bReason = args.slice(1).join(` `);
  if (!bReason) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`Please given a reason for the user to be banned!`)
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`Sorry, that user can not be banned!`)
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  
  bUser.ban(bUser, {
    bReason: bReason
  })
  message.channel.send(new Discord.MessageEmbed()
  .setDescription(`${bUser} has been banned!`)
  .setColor("#0e2b82")
  .setImage("https://cdn.discordapp.com/attachments/708353767233552498/821455133677846557/tenor.gif")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`));


  let banEmbed = new Discord.MessageEmbed()
    .setTitle(`Ban`)
    .setColor("#0e2b82")
    .addField("Banned User:", `${bUser} ID: ${bUser.id}`)
    .addField("Banned By:", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Banned In:", message.channel)
    .addField("Reason:", bReason)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  let sChannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
  if (!sChannel) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Please create a `bot-logs` channel first!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }));
  message.guild.member(bUser).ban();
  sChannel.send(banEmbed)
}

module.exports.help = {
  name: "ban"
}