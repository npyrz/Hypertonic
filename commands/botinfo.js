const Discord = require("discord.js");
const prefix = require("discord-prefix");

module.exports.run = async(bot, message, args) => {
    let guildPrefix = prefix.getPrefix(message.guild.id);
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.MessageEmbed()
        .setTitle(`Hypertonic Bot Information`)
        .setThumbnail(bot.user.displayAvatarURL())
        .addField('**ID:**', bot.user.id)
        .setColor("#0e2b82")
        .addField('**Name:**', bot.user.username)
        .addField('**Created On:**', `Sunday, September 1st, 2019`)
        .addField('**Server Prefix:**', `${guildPrefix}`)
        .addField('**Total Servers:**', bot.guilds.cache.size)
        .addField('**Developed By:**', 'Hypertonic Administration')
        .setFooter('🔑Join https://discord.gg/8wBgDk3 for Support!🔑')

    message.channel.send(botembed);
}
module.exports.help = {
    name: "botinfo"
}