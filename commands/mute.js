const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, you don't have permission to mute!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, can't find the user you're trying to mute!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  
  if (tomute.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, that user can not be muted!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  
  let reason = args.slice(2).join(" ");
  if (!reason) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Please supply a reason for the user to be muted!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  
  message.channel.send(new Discord.MessageEmbed()
  .setDescription(`${tomute} has been muted!`)
  .setImage("https://cdn.discordapp.com/attachments/708353767233552498/821790407749795860/tenor_5.gif")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))


  let muterole = message.guild.roles.cache.find(role => role.name === `muted`);
  if (!muterole) {
    try {
      muterole = await message.guild.roles.create({
        data: {
          name: "muted",
          color: "#000000",
          permissions: []
        },
        reason: `No Prior Mute Role.`
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
  let mutetime = args[1];
  if (!mutetime) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Please specify the amount of time you want the user to be muted!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  
  message.delete().catch(O_o => {});
  try {
    await tomute.send(new Discord.MessageEmbed()
    .setDescription(`You've been muted for ${mutetime} for the reason ${reason}!`)
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  } catch (e) {}

  let muteembed = new Discord.MessageEmbed()
    .setTitle(`Mute`)
    .setColor("#0e2b82")
    .addField("Muted User:", tomute)
    .addField("Muted By:", `<@${message.author.id}>`)
    .addField("Muted In:", message.channel)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp()
    .addField("Length", mutetime)
    .addField("Reason", reason);

  let channel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
  if (!channel) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Please create a `bot-logs` channel first!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }));
  channel.send(muteembed);
  await (tomute.roles.add(muterole));
  setTimeout(function () {
    tomute.roles.remove(muterole);
  }, ms(mutetime));
}
module.exports.help = {
  name: "mute"
}