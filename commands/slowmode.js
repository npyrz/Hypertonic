const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async(client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Please set a logging channel with the \`\`setlogs\`\` command!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    let duration = args[0];
    if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Incorrect Usage`)
    .setDescription("Correct Usage: ``slowmode [SLOWMODE #]``")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Sorry, you don't have permission to use slowmode!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    message.channel.setRateLimitPerUser(duration);
    message.channel.send(new Discord.MessageEmbed()
        .setDescription("Slowmode has been set to " + "`" + duration + "`" + " !")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    let muteembed = new Discord.MessageEmbed()
        .setTitle(`Slowmode`)
        .setColor("#0e2b82")
        .addField("Slowmode By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Slowmode In:", message.channel)
        .addField("Slowmode Amount:", duration)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    client.channels.cache.get(LoggingChannel).send(muteembed)

}
module.exports.help = {
    name: 'slowmode'
}