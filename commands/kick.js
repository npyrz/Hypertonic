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
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry, you don't have permission to kick!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Incorrect Usage`)
    .setDescription("Correct Usage: ``kick [@NAME/ID] [REASON]``")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    let kReason = args.join(" ").slice(22);
    if (!kReason) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Incorrect Usage`)
    .setDescription("Correct Usage: ``kick [@NAME/ID] [REASON]``")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry, that user can not be kicked!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`${kUser} has been kicked!`)
        .setColor("#0e2b82")
        .setImage("https://cdn.discordapp.com/attachments/708353767233552498/821764214627631174/tenor_1.gif")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    let kickEmbed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle("Kick")
        .addField("Kicked User:", `${kUser} ID: ${kUser.id}`)
        .addField("Kicked By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Kicked In:", message.channel)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp()
        .addField("Reason:", kReason);
    message.guild.member(kUser).kick(kReason);
    client.channels.cache.get(LoggingChannel).send(kickEmbed)
}
module.exports.help = {
    name: "kick"
}