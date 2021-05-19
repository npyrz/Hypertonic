const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)

    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry, you you don't have permission to addroles!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => [r.name, r.id].includes(args.slice(1).join(' ')))

    if (!member || !role) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`To add a role to a user please do \`\`[prefix]addrole @NAME/ID | @ROLE/NAME/ID\`\``)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('That member has higher roles than you, you can\'t add a role to them!')
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    if (member.roles.highest.rawPosition >= message.guild.me.roles.highest.rawPosition) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('That member has higher roles than me, I can\'t add a role to them!')
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .setColor("#0e2b82")
        .then(m => m.delete({ timeout: 30000 }))

    if (member.roles.cache.has(role.id)) {
        return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`That member already has the role ${role}!`)
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
            .then(m => m.delete({ timeout: 30000 }))
    } else {
        await member.roles.add(role.id).catch(e => console.log(e.message))
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`The role **${role}** has been added to ${member}!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }

    let embed = new Discord.MessageEmbed()
        .setTitle(`AddRole`)
        .setColor("#0e2b82")
        .addField('User recieving the role:', `${member.user} ID: ${member.userid}`)
        .addField('User giving the role:', `<@${message.author.id}> ID: ${message.author.id}`)
        .addField('Role Given:', role)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();

    client.channels.cache.get(LoggingChannel).send(embed)
}

module.exports.help = {
    name: "addrole"
}