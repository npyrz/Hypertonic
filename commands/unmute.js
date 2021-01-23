const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry you don't have permission to unmute!").then(m => {
    m.delete({timeout: 15000})
  });
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.reply("Can't find the user!").then(m => {
    m.delete({timeout: 15000})
  });
  if (tomute.hasPermission("MANAGE_ROLES")) return message.reply("Sorry that user can not be unmuted!").then(m => {
    m.delete({timeout: 15000})
  });
  message.channel.send(`${tomute} has been unmuted!`)
  let muterole = message.guild.roles.find(role => role.name === `Muted`);
  if (!muterole) {
    try {
      muterole = await message.guild.roles.create({
        data: {
          name: "Muted",
          color: "#000000",
          permissions: []
        },
        reason: 'No prior mute role.'
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.updateOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  if(!tomute.roles.cache.find(role => role.name === `Muted`)) return message.channel.send(`This user is not muted.`)
  await tomute.send(`You've been unmuted!`)

  let muteembed = new Discord.MessageEmbed()
    .setDescription(`Unmute`)
    .setColor("#0e2b82")
    .addField("Muted User", tomute)
    .addField("Unmuted By:", `<@${message.author.id}>`)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

  let channel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
  if (!channel) return message.reply("Please create a `bot-logs`  channel first!");
  channel.send(muteembed);
  await (tomute.roles.remove(muterole));
  setTimeout(function () {
    tomute.roles.remove(muterole);
  });
}

module.exports.help = {
  name: "unmute"
}