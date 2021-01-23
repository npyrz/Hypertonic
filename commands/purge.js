const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you don't have permission to use this command! ").then(m => {
    m.delete({timeout: 10000})
  });
  if (!args[0]) return message.channel.send("Please give the amout of messages you want purged!").then(m => {
    m.delete({timeout: 10000})
  });
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(` <@${message.author.id}> purged ${args[0]} messages!`);
  });
}
module.exports.help = {
  name: "purge"
}