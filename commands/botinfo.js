const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
    .setDescription("Bot Information")
    .setColor("#0e2b82")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Bot Developer", "HypnoticNoah")
    .addField("Created On", bot.user.createdAt)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name: "botinfo"
}