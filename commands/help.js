const Discord = require("discord.js");
    module.exports.run = async (bot, message, args) => {
      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
  .setColor("#FF0000")
  .setDescription("Hello, I would like to thank you for using **Hypertonic**! If you have any questions go to the support discord server so someone can help you. If your having issues with the discord bot please immediately contact **Hypertonic Developers** so the bot can be fixed! If you have any suggestions or would like make a report go to the support discord! If want to know the commands do `!cmds` and you will be re-directed from there! Once again thanks for using **Hypertonic**!")
  .setFooter("Hypertonic Developers")
  .setTimestamp()
  .setImage("https://cdn.discordapp.com/attachments/633086365093068823/634963597759610900/tenor_3.gif")
  .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
  .setFooter("Hypertonic Developers")
  .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name:"help"
}