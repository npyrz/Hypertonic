const Discord = require("discord.js");
const StopWatch = require("timer-stopwatch-dev");
const moment = require('moment');
module.exports.run = async (bot, message, args, CurrentTimers) => {
  
  let guildTimers = CurrentTimers.get(message.guild.id);
  let guildTimersUser = guildTimers.get(message.author.id);
  if (!guildTimersUser) {
    guildTimers.set(message.author.id, new StopWatch());
    guildTimersUser = guildTimers.get(message.author.id);
  };

  if (!args[0] || args[0] === 'start') {
    if (guildTimersUser.isRunning()) return message.channel.send(new Discord.MessageEmbed().setTitle('⏱️You need to stop the Stopwatch first!⏱️').setDescription('Do `' + bot.prefix + 'stopwatch stop` to stop the Stopwatch!')).setColor("#0e2b82");
    guildTimersUser.start();
    message.channel.send(new Discord.MessageEmbed().setTitle('⏱️You have started the Stopwatch!⏱️').setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑").setColor("#0e2b82"));
  } else if (args[0] === 'stop') {
    if (!guildTimersUser.isRunning()) return message.channel.send(new Discord.MessageEmbed().setTitle('⏱️You need to start the Stopwatch first!⏱️').setDescription('Do `' + bot.prefix + 'stopwatch start` to start the Stopwatch!').setColor("#0e2b82"));
    guildTimersUser.stop();
    message.channel.send(new Discord.MessageEmbed().setTitle('⏱️You have stopped the Stopwatch!⏱️').setDescription('Total Time: ' + dhm(guildTimersUser.ms)).setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑").setColor("#0e2b82"));
  }

  function dhm(ms) {
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " days, " + hours + " hours, " + minutes + " minutes, " + sec + " seconds.";
  }
}
module.exports.help = {
  name: "stopwatch"
}