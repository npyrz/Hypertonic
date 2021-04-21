const Discord = require("discord.js");
const prefix = require("discord-prefix");

module.exports.run = async(bot, message, args) => {
    let guildPrefix = prefix.getPrefix(message.guild.id);
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.MessageEmbed()
        .setTitle("**__Hypertonic Commands__**")
        .setColor("#0e2b82")
        .addField("🔨Moderation Commands🔨",
            `\`${guildPrefix}modcmds\``, )
        .addField("🖥General Commands🖥",
            `\`${guildPrefix}generalcmds\``, )
        .addField("😎Fun Commands😎",
            `\`${guildPrefix}funcmds\``, )
        .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑");

    message.channel.send(botembed);
}
module.exports.help = {
    name: "cmds"
}