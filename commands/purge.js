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
    const member = message.guild.members.cache.get(args[0]);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Sorry, you don't have permission to purge!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Incorrect Usage`)
    .setDescription("Correct Usage: ``purge [#]``")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> has purged ${args[0]} messages!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    });


    let muteembed = new Discord.MessageEmbed()
        .setTitle(`Purge`)
        .setColor("#0e2b82")
        .addField("Purged By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Purged In:", message.channel)
        .addField("Amount of messages purged:", `${args[0]}`)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    client.channels.cache.get(LoggingChannel).send(muteembed)

}
module.exports.help = {
    name: "purge"
}