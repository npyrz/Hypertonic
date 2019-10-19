const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Sorry you don't have permission to use this command!").then(m => {m.delete(10000)});
  let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
  if(!rMember) return message.channel.send("Please provide a user! `!addrole @[USER] [ROLE]`").then(m => {m.delete(10000)});
  let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
  if(!role) return message.channel.send("Please add the role name! `!addrole @[USER] [ROLE]`").then(m => {m.delete(10000)});
  
  if(rMember.roles.has(role.id)) {
    return message.channel.send(`**__${rMember.displayName}__**, already has the role!`).then(m => {m.delete(10000)});
  } else {
    await rMember.addRole(role.id).catch(e => console.log(e.message))
    message.channel.send(`The role **${role.name}** has been added to ${rMember}!!!`)
  }
let embed = new Discord.RichEmbed()
.setDescription(`AddRole`)
.setColor("#FF0000")
.addField('User recieving the role:', rMember.user.username)
.addField('User giving the role:', message.author.username)
.setFooter("Nava Developers")
.setTimestamp();

let sChannel = message.guild.channels.find(c => c.name === 'bot-logs')
sChannel.send(embed)

}

module.exports.help = {
  name: "addrole"
}