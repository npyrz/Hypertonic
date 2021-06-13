const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Please set a logging channel with the \`\`setlogs\`\` command!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry! You are missing the permission \`MANAGE_ROLES\`!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => [r.name, r.id].includes(args.slice(1).join(' ')))


    if (!member || !role) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Incorrect Usage`)
            .setDescription("Correct Usage: ``removerole [@NAME/ID] [@ROLE/NAME/ID]``")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('That member has higher roles than you, you can\'t add remove a role from them!')
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    if (member.roles.highest.rawPosition >= message.guild.me.roles.highest.rawPosition) {
        return message.channel.send(new Discord.MessageEmbed()
                .setDescription('That member has higher roles than me, I can\'t remove a role from them!')
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
            .setColor("#0e2b82")
            .then(m => m.delete({ timeout: 30000 }))
    } else {
        await member.roles.remove(role.id).catch(e => console.log(e.message))
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`The role **${role}** has been removed from ${member}!!!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }

    let embed = new Discord.MessageEmbed()
        .setTitle(`RemoveRole`)
        .setColor("#0e2b82")
        .addField('User who got the role removed:', `${member.user} ID: ${member.user.id}`)
        .addField('User who removed the role:', `<@${message.author.id}> ID:${message.author.id}`)
        .addField('Removed Role:', role)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    client.channels.cache.get(LoggingChannel).send(embed)
}

module.exports.help = {
    name: "removerole"
}