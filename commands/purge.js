const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you don't have permission to use this command! ").then(m => {m.delete(10000)});
  if(!args[0]) return message.channel.send("Sorry you don't have permission to use this command! ").then(m => {m.delete(10000)});
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Purged ${args[0]} messages!`).then(msg => msg.delete(25000));
});
}
module.exports.help = {
  name: "purge"
}