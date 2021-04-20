const Discord = require("discord.js");
const prefix = require("discord-prefix")

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply("You don't have permission to use this command");

    const newPrefix = args[0];

    const Errorembed = new Discord.MessageEmbed()
        .setColor("0e2b82")
        .setDescription("Usage: \n`setprefix <new prefix>`")
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
        .addField(`User changing server prefix:`, `<@${message.author.id}>`)
        .addField('Server Prefix:', `${newPrefix}`)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`)
        .setTimestamp();
    let sChannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
    if (!sChannel) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Please create a `bot-logs` channel first!")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    sChannel.send(Prefixembed)
};

module.exports.help = {
    name: 'setprefix'
}