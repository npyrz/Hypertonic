const Discord = require("discord.js")
module.exports.run = async(client, message, args) => {

   
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Sorry! You are missing the permission \`MANAGE_ROLES\`!`)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => [r.name, r.id].includes(args.slice(1).join(' ')))

   
    if (!member || !role) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`To add a role to a user please do \`\`!addrole @NAME/ID | @ROLE/NAME/ID\`\``)
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 9000 }))

    
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('That member has higher roles than you, you can\'t add a role to them!')
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    
    if (member.roles.highest.rawPosition >= message.guild.me.roles.highest.rawPosition) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('That member has higher roles than me, I can\'t add a role to them!')
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

   
    if (member.roles.cache.has(role.id)) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`That member already has the role ${role}!`)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        else {
          await rMember.roles.add(role.id).catch(e => console.log(e.message))
          message.channel.send(`The role **${role}** has been added to ${member.user}!!!`)
        }
    

    let embed = new Discord.MessageEmbed()
    .setDescription(`AddRole`)
    .setColor("#0e2b82")
    .addField('User recieving the role:', member.user)
    .addField('User giving the role:', message.author)
    .addField('Role Given:', role)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  let sChannel = message.guild.channels.cache.find(channel => channel.name === "bot-logs")
  sChannel.send(embed)

}

module.exports.help = {
    name: "addrole"
}
