const Discord = require("discord.js");
const prefix = require("discord-prefix")
const db = require("quick.db")

module.exports.run = async(client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Please set a logging channel with the \`\`setlogs\`\` command!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply("You don't have permission to use this command");

    const newPrefix = args[0];

    const Errorembed = new Discord.MessageEmbed()
        .setDescription(`Incorrect Usage`)
        .setDescription("Correct Usage: ``setprefix [PREFIX]``")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`)
    if (!newPrefix)
        return await message.reply(Errorembed)


    prefix.setPrefix(`${newPrefix}`, message.guild.id)
    await message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Prefix set to \`${newPrefix}\``)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    let Prefixembed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle("Prefix")
        .addField(`User changing server prefix:`, `<@${message.author.id}> ID: ${message.author.id}`)
        .addField('Server Prefix:', `${newPrefix}`)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`)
        .setTimestamp();
    client.channels.cache.get(LoggingChannel).send(Prefixembed)
};

module.exports.help = {
    name: 'setprefix'
}