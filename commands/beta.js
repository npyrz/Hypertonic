const Discord = require("discord.js");
    module.exports.run = async (bot, message, args) => {
      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
  .setColor("#FF0000")
  .setDescription("Hello, I would like to thank you for using **Nava**! Vesrion 1 Beta only contians mostly all the **__Moderation__** features of the bot and a few basic other features! If you have any questions join the support discord! Also make sure to give some suggestions/feedback on the bot! Thank you!!!")
  .setFooter("Nava Developers")
  .setTimestamp()
  .setImage("https://cdn.discordapp.com/attachments/633086365093068823/634977161912254470/beta.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/633086365093068823/634963215570436096/2033dd42ec0782213771fa7c8c3e50c5.jpg")
  .setFooter("Nava Developers")
  .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name:"beta"
}