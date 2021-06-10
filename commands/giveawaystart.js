const Discord = require("discord.js");
const db = require("quick.db")
const ms = require('ms');

exports.run = async(client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Please set a logging channel with the \`\`setlogs\`\` command!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry, you don't have permission to start giveaways!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    let giveawayChannel = message.mentions.channels.first();
    if (!giveawayChannel) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Incorrect Usage`)
            .setDescription("Correct Usage: ``giveawaystart [CHANNEL] [TIME] [WINNERS] [PRIZE]``")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    let giveawayDuration = args[1];
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Incorrect Usage`)
            .setDescription("Correct Usage: ``giveawaystart [CHANNEL] [TIME] [WINNERS] [PRIZE]``")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    let giveawayNumberWinners = args[2];
    if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Incorrect Usage`)
            .setDescription("Correct Usage: ``giveawaystart [CHANNEL] [TIME] [WINNERS] [PRIZE]``")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    let giveawayPrize = args.slice(3).join(' ');
    if (!giveawayPrize) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Incorrect Usage`)
            .setDescription("Correct Usage: ``giveawaystart [CHANNEL] [TIME] [WINNERS] [PRIZE]``")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        setColor: "#0e2b82",
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: message.author,
        messages: {
            giveaway: "🎉 **Giveaway** 🎉",
            giveawayEnded: "🎉 **Giveaway Ended** 🎉 ",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, nobody entered :(",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            setColor: "#0e2b82",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });
    let embed = new Discord.MessageEmbed()
        .setTitle(`Giveaway Start`)
        .setColor("#0e2b82")
        .addField(`User who started the giveaway:`, `<@${message.author.id}> ID: ${message.author.id}`)
        .addField('Giveaway Channel:', giveawayChannel)
        .addField('Giveaway Duration:', giveawayDuration)
        .addField('Amount of Giveaway Winners', giveawayNumberWinners)
        .addField('Giveaway Prize', giveawayPrize)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    client.channels.cache.get(LoggingChannel).send(embed)


    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Giveaway started in ${giveawayChannel}!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
};

module.exports.help = {
    name: "giveawaystart"
}