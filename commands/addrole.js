const Discord = require("discord.js")
module.exports.run = async(client, message, args) => {

    //Check for permissions
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Sorry! You are missing the permission \`MANAGE_ROLES\``)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => [r.name, r.id].includes(args.slice(1).join(' ')))

    //Checks to see if formatted right and @'ed a User/Role
    if (!member || !role) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`To add a role to a User please do \`\`!addrole @NAME/ID | @ROLE/NAME/ID\`\``)
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 9000 }))

    //Checks if Moderator is lower than person trying to add roles to
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('That member has higher roles than you, you cant add a role from them!')
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    //Checks if User to add role to is higher than bot
    if (member.roles.highest.rawPosition >= message.guild.me.roles.highest.rawPosition) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('That member has higher roles than me, I can\'t add a role to them!')
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    //Checks if user has role
    if (member.roles.cache.has(role.id)) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`That member already has the role ${role}!`)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    //Success Embed
    const embed = new Discord.MessageEmbed()
        .setTitle(`Successfully Added Role!`)
        .addField('Member:', member.user)
        .addField('Moderator:', message.author)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`)
        .addField('Role:', role)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

    //Error Thingy
    return member.roles.add(role).then(() =>
        message.channel.send(embed)).catch(() => message.channel.send(new Discord.MessageEmbed()
        .setDescription('I can\'t add roles to that user! ERROR')
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`)))
}

//Only works this way... fuck off
module.exports.help = {
    name: "addrole"
}