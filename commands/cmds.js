const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("**__Nava Commands__**")
    .setColor("#FF0000")
    .addField("🔨Moderation Commands🔨",  
    "`!modcmds`",)
    .addField("🖥General Commands🖥",
    "`!generalcmds`",)
    .setFooter(message.createdAt)
    .setThumbnail("https://cdn.discordapp.com/attachments/633086365093068823/634932959698223106/2033dd42ec0782213771fa7c8c3e50c5.jpg")
    .setFooter("Nava Developers")
    .setTimestamp();
    
    message.channel.send(botembed);
}
module.exports.help = {
  name:"cmds"
}