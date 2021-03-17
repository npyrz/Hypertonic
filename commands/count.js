const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;

    message.delete();

    message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Hypertonic is in ${bot.guilds.cache.size} servers and is serving a total of ${bot.users.cache.size} members!`)
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
}

module.exports.help = {
name: 'count'
}
