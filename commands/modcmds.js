const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.MessageEmbed()
        .setTitle("**__🔨Moderation Commands🔨__**")
        .setColor("#0e2b82")
        .setDescription("`addrole` | `ban` | `kick` | `mute` | `purge` | `removerole` | `strike` | `unban` | `unmute` | `lockdown` | `modperms` | `commend` | `slowmode` | `createemoji` | `setprefix` | `giveawaystart` | `giveawayreroll` | `giveawayend` | `setlogs`")
        .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    message.channel.send(botembed);
}
module.exports.help = {
    name: "modcmds"
}