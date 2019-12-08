const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("**__🔨Moderation Commands🔨__**")
    .setColor("#FF0000")
    .setDescription("`addrole` | `ban` | `kick` | `mute` | `purge` | `removerole` | `strike` | `unban` | `unmute` | `lockdown`")
    .setFooter(message.createdAt)
    .setThumbnail("https://cdn.discordapp.com/attachments/633086365093068823/634935281597808662/giphy_5.gif")
    .setFooter("Hypertonic Developers")
    .setTimestamp();
    message.channel.send(botembed);
}
module.exports.help = {
  name:"modcmds"
}