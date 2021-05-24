const Discord = require("discord.js");
const db = require("quick.db")
const ms = require('ms');

exports.run = async(client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.reply(`Please set a Logging Channel with \`\`setlogs\`\` Command!`)
    }
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry, you don't have permission to end giveaways!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    if (!args[0]) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry, you need to specify a valid message ID!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    let giveaway =
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
    if (!giveaway) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Sorry,unable to find a giveaway for `' + args.join(' ') + '`.')
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
        .then(() => {
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`Giveaway will end shortly!`)
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        })

    let embed = new Discord.MessageEmbed()
        .setTitle(`Giveaway End`)
        .setColor("#0e2b82")
        .addField(`User who ended the giveaway:`, `<@${message.author.id}> ID: ${message.author.id}`)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    client.channels.cache.get(LoggingChannel).send(embed)
};

module.exports.help = {
    name: "giveawayend"
}