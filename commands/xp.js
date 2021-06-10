const Discord = require('discord.js');
const db = require('quick.db')
module.exports.run = async(client, message, args, tools) => {
    let Toggle = args.join(" ");

    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Please set a logging channel with the \`\`setlogs\`\` command!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Sorry, you don't have permission to Toggle XP!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    if (!Toggle) {
        const ErrorEmbed = new Discord.MessageEmbed()
        .setTitle(`Incorrect Usage!`)
        .setDescription(`Correct Usage: **xp [on/off]**`)
        .setColor('#0e2b82')
        .setFooter('🔑Join https://discord.gg/8wBgDk3 for Support!🔑')
        message.channel.send(ErrorEmbed)
    }

    if (Toggle == 'on') {
        const OnEmbed = new Discord.MessageEmbed()
            .setDescription(`XP Set **On**`)
            .setColor('#0e2b82')
            .setFooter('🔑Join https://discord.gg/8wBgDk3 for Support!🔑')
        message.channel.send(OnEmbed)
        db.set(`xp_toggle_${message.guild.id}`, Toggle)
    }

    if (Toggle == 'off') {
        const OffEmbed = new Discord.MessageEmbed()
            .setDescription(`XP Set **Off**`)
            .setColor('#0e2b82')
            .setFooter('🔑Join https://discord.gg/8wBgDk3 for Support!🔑')
        message.channel.send(OffEmbed)
        db.set(`xp_toggle_${message.guild.id}`, Toggle)
    }

    let embed = new Discord.MessageEmbed()
        .setTitle("XP Toggled")
        .setColor("#0e2b82")
        .addField("XP Toggled By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Toggled:", `${Toggle}`)
        .addField("Toggled In:", message.channel)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp()
    client.channels.cache.get(LoggingChannel).send(embed)
};
module.exports.help = {
    name: 'xp'
};
