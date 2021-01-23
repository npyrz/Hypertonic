const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry you don't have permission to mute!").then(m => {
    m.delete({timeout: 15000})
  });
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.reply("Can't find the user!").then(m => {
    m.delete({timeout: 15000})
  });
  if (tomute.hasPermission("MANAGE_ROLES")) return message.reply("Sorry that user can not be muted!").then(m => {
    m.delete({timeout: 15000})
  });
  let reason = args.slice(2).join(" ");
  if (!reason) return message.reply("Please supply a reason for the user to be muted!").then(m => {
    m.delete({timeout: 15000})
  });
  message.channel.send(`${tomute} has been muted!`)
  let muterole = message.guild.roles.cache.find(role => role.name === `Muted`);
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
  if (!mutetime) return message.reply("Please specify the amount of time you want the user to be muted!").then(m => {
    m.delete({timeout: 15000})
  });
  message.delete().catch(O_o => {});
  try {
    await tomute.send(`You've been muted for ${mutetime} for the reason ${reason}!`)
  } catch (e) {}
  let muteembed = new Discord.MessageEmbed()
    .setDescription(`Mute`)
    .setColor("#0e2b82")
    .addField("Muted User:", tomute)
    .addField("Muted By:", `<@${message.author.id}>`)
    .addField("Muted In:", message.channel)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp()
    .addField("Length", mutetime)
    .addField("Reason", reason);

  let channel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
  if (!channel) return message.reply("Please create a `bot-logs` channel first!");
  channel.send(muteembed);
  await (tomute.roles.add(muterole));
  setTimeout(function () {
    tomute.roles.remove(muterole);
  }, ms(mutetime));
}
module.exports.help = {
  name: "mute"
}