const Discord = require("discord.js");
    module.exports.run = async (bot, message, args) => {
      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
  .setColor("#FF0000")
  .setDescription("Hello, I would like to thank you for using **Nava**! If you have any questions go to the support discord server so someone can help you. If your having issues with the discord bot please immediately contact **Nava Developers** so the bot can be fixed! If you have any suggestions or would like make a report go to the support discord! If want to know the commands do `!cmds` and you will be re-directed from there! Once again thanks for using **Nava**!")
  .setFooter("Nava Developers")
  .setTimestamp()
  .setImage("https://cdn.discordapp.com/attachments/633086365093068823/634963597759610900/tenor_3.gif")
  .setThumbnail("https://cdn.discordapp.com/attachments/633086365093068823/634963215570436096/2033dd42ec0782213771fa7c8c3e50c5.jpg")
  .setFooter("Nava Developers")
  .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name:"help"
}