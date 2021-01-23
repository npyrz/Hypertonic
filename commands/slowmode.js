
//Slowmode moved to a command
module.exports.run = async (bot, message, args) => {
    let duration = args[0];
    if (!args[0]) return message.channel.send("Please specify the time! `!slowmode [TIME]`");
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you don't have permission to use slowmode!").then(m => {
      m.delete({timeout: 10000});
    });
    message.channel.setRateLimitPerUser(duration);
    message.channel.send("Slowmode has been set to " + "`" + duration + "`" + " !");

}

module.exports.help = {
  name: 'slowmode'
  }