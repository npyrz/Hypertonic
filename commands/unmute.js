const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, you don't have permission to unmute!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, can't find the user!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  
  if (tomute.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, that user can not be unmuted!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
   
  let muterole = message.guild.roles.cache.find(role => role.name === `muted`);
  if (!muterole) {
    try {
      muterole = await message.guild.roles.create({
        data: {
          name: "muted",
          color: "#000000",
          permissions: []
        },
        reason: 'No prior mute role.'
      })
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  if(!tomute.roles.cache.find(role => role.name === `muted`)) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, this user is not muted!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))

  tomute.roles.remove(muterole.id).then(() => {
    tomute.send(new Discord.MessageEmbed()
    .setDescription("You've been unmuted")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    message.channel.send(new Discord.MessageEmbed()
    .setDescription(`${tomute} has been unmuted!`)
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  })

  let muteembed = new Discord.MessageEmbed()
    .setTitle(`Unmute`)
    .setColor("#0e2b82")
    .addField("Muted User", tomute)
    .addField("Unmuted By:", `<@${message.author.id}>`)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

    let sChannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
    if (!sChannel) return message.channel.send(new Discord.MessageEmbed()
    .setDescription("Please create a `bot-logs` channel first!")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    .then(m => m.delete({ timeout: 30000 }));
    sChannel.send(muteembed)

}

module.exports.help = {
  name: "unmute"
}