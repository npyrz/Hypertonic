const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Sorry you don't have permission to use this command!").then(m => {
    m.delete({timeout: 1000})
  });
  let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
  if (!rMember) return message.channel.send("Please provide an user! `!removerole @[USER] [ROLE]` Also please make sure the role `Hypertonic` is above all the roles!").then(m => {
    m.delete({timeout: 1000})
  });
  let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
  if (!role) return message.channel.send("Please add the role name! `!removerole @[USER] [ROLE]` Also please make sure the role `Hypertonic` is above all the roles!").then(m => {
    m.delete({timeout: 1000})
  });

  if (!rMember.roles.cache.get(role.id)) {
    return message.channel.send(`**__${rMember.nickname}__**, doesn't have that role!`).then(m => {
      m.delete({timeout: 1000})
    });
  } else {
    await rMember.roles.remove(role).catch(e => console.log(e.message))
    message.channel.send(`The role **__${role.name}__**, has been removed from **__${rMember.nickname}!__**`)
  }
  let embed = new Discord.MessageEmbed()
    .setDescription(`RemoveRole`)
    .setColor("#0e2b82")
    .addField('User who got the role removed:', rMember.user.username)
    .addField('User who removed the role:', message.author.username)
    .addField('Role Removed:', role.name)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  let sChannel = message.guild.channels.cache.find(c => c.name === 'bot-logs')
  sChannel.send(embed)

}

module.exports.help = {
  name: "removerole"
}