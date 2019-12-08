const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("**__🖥General Commands🖥__**")
    .setColor("#FF0000")
    .setDescription("`botinfo` | `serverinfo` | `userinfo` | `help` | `beta` | `cmds` | `supportdiscord`")
    .setFooter(message.createdAt)
    .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
    .setFooter("Hypertonic Developers")
    .setTimestamp();
    message.channel.send(botembed);
}
module.exports.help = {
  name:"generalcmds"
}