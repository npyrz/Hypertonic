const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete();

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
    .setTitle("**__🔨Moderation Commands Permissions🔨__**")
    .setColor("#0e2b82")
    .setDescription("`addrole = MANAGE_ROLES ` | `ban = BAN_MEMBERS` | `kick = KICK_MEMBERS` | `mute = MANAGE_ROLES` | `purge = MANAGE_MESSAGES` | `removerole = MANAGE_ROLES` | `strike = KICK_MEMBERS` | `unban = BAN_MEMBERS` | `unmute = MANAGE_ROLES` | `lockdown = MANAGE_MESSAGES` | `commend = MANAGE_MESSAGES` | `slowmode = MANAGE_MESSAGES` | `createemoji = MANAGE_EMOJIS` **All other commands are available to everyone!**")
    .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
  message.channel.send(botembed);
}
module.exports.help = {
  name: "modperms"
}