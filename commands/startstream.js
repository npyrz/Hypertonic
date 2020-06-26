const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("SEND_MESSAGES")) return message.reply("Sorry you don't have permission to stream!").then(m => {
    m.delete(15000)
  });
  let stream = message.guild.member(message.author || message.guild.members.get(args[0]));
  let reason = args.slice(0).join(" ");
  if (!reason) return message.reply("Please supply a link to your stream!").then(m => {
    m.delete(15000)
  });
  message.channel.send(`${stream} is now **__🛑LIVE🛑__**!! Check out their stream @ **__${reason}__**!!!`)

  let streamembed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} Started Streaming `, message.author.displayAvatarURL)
    .setColor("#0e2b82")
    .addField("Link:", reason)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setImage("https://cdn.discordapp.com/attachments/693317100596363274/713748213185773598/tenor.gif")
    .setTimestamp()


  let sChannel = message.guild.channels.cache.find(c => c.name === 'streams')
  sChannel.send(streamembed)

}
module.exports.help = {
  name: "startstream"
}