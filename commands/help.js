const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setDescription("Thank you for using **Hypertonic**, if you have any questions, suggestions, or bug reports join support discord by doing `!support`! If want to know the all the commands for the bot do `!cmds`! If you want to know the permissions of the commands do `!modperms`! **Remember donating is not mandatory but greatly appreciated so quality of the discord bot can increase!** Once again thanks for using **Hypertonic**!")
    .setImage("https://cdn.discordapp.com/attachments/633086365093068823/634963597759610900/tenor_3.gif")
    .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name: "help"
}