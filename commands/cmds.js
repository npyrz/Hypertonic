const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("**__Hypertonic Commands__**")
    .setColor("#FF0000")
    .addField("🔨Moderation Commands🔨",  
    "`!modcmds`",)
    .addField("🖥General Commands🖥",
    "`!generalcmds`",)
    .setFooter(message.createdAt)
    .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
    .setFooter("Hypertonic Developers")
    .setTimestamp();
    
    message.channel.send(botembed);
}
module.exports.help = {
  name:"cmds"
}