const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("**__🖥General Commands🖥__**")
    .setColor("#FF0000")
    .setDescription("`botinfo` | `serverinfo` | `userinfo` | `help` | `beta` | `cmds` | `beta`")
    .setFooter(message.createdAt)
    .setThumbnail("https://cdn.discordapp.com/attachments/633086365093068823/634936384330924062/nitro_gif.gif")
    .setFooter("Nava Developers")
    .setTimestamp();
    message.channel.send(botembed);
}
module.exports.help = {
  name:"generalcmds"
}