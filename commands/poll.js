const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let thingToEcho = args.join(" ");
  if (!thingToEcho) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`Incorrect Usage`)
  .setDescription("Correct Usage: ``poll (QUESTION)``")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
.then(m => m.delete({ timeout: 30000 }))


  let embed = new Discord.MessageEmbed()
    .setAuthor(`Poll Created By: ${message.author.username}`, message.author.displayAvatarURL)
    .setColor("#0e2b82")
    .addField("**Poll Details:**",
      thingToEcho)
    .setThumbnail("https://cdn.discordapp.com/attachments/693317100596363274/713481339038597141/51cOM2ZPaoL.png")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(embed).then(message => {
    message.react("✅");
    message.react("❎");
  })
}
module.exports.help = {
  name: "poll"
}