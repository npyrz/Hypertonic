const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const fs = require("fs");
const prefix = botconfig.prefix;
const bot = new Discord.Client({
  disableEveryone: true
});
bot.commands = new Discord.Collection();
bot.prefix = prefix;
bot.config = botconfig;
const CurrentTimers = new Map();
const client = new Discord.Client();
let statuses = ['🗯️!help🗯️', '🔑!cmds🔑', '🖥️discord.gg/8wBgDk3🖥️', '💸!donate💸', 'Prefix: !', 'Version 1.2.0'];
setInterval(function () {

  let status = statuses[Math.floor(Math.random() * statuses.length)];

  bot.user.setPresence({

    activity: {
      name: status
    },

    status: 'online'
  });
}, 5000)

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  if (!CurrentTimers.get(message.guild.id)) {
    CurrentTimers.set(message.guild.id, new Map());
  };

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) return commandfile.run(bot, message, args, CurrentTimers);

});

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

var scount = bot.guilds.size;
var usercount = bot.users.size;

bot.on("message", message => {
  let args = message.content.substring(prefix.length).split(" ");

  if (message.content.startsWith(prefix + "count")) {
    if (message.author.bot) return;
    message.reply(
      `Hypertonic is on ${bot.guilds.cache.size} servers and serving ${bot.users.cache.size} members!`
    );
  }
});
var eightball = [
  "Yes",
  "No",
  "Maybe",
  "Probably",
  "There's a chance",
  "Never"
];

bot.on("message", message => {
  let args = message.content.substring(prefix.length).split(" ");

  if (message.content.startsWith(prefix + "8ball")) {
    if (message.author.bot) return;
    if (args[1] != null)
      message.reply(
        eightball[Math.floor(Math.random() * eightball.length).toString(16)]
      );
    else
      message.channel.send(
        "Give me a question, I'll give you an answer!😉 `!8ball [QUESTION]`"
      );
  }
});
bot.on("message", message => {
  if (message.content.startsWith(prefix + "slowmode")) {
    let args = message.content.split(" ").slice(1);
    let duration = args[0]
    if (!args[0]) return message.channel.send("Please specify the time! `!slowmode [TIME]`")
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you don't have permission to use slowmode!").then(m => {
      m.delete(10000)
    });
    message.channel.setRateLimitPerUser(duration)
    message.channel.send("Slowmode has been set to " + "`" + duration + "`" + " !")
  }
});


bot.on("message", message => {
  let words = ['covid', 'virus', 'corona']
  let foundInText = false;
  for (var i in words) {
    if (message.content.toLowerCase().includes(words[i].toLowerCase())) foundInText = true;
  }
  if (foundInText) {
    let botembed = new Discord.MessageEmbed()
      .setColor("#0e2b82")
      .setImage("https://cdn.discordapp.com/attachments/708353767233552498/719379861356937236/unknown.png")
      .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
      .setTimestamp();
    message.channel.send(botembed);
  }
});







bot.login('NjE3Nzg0NzUzNDgyODkxMzE2.XWwK4w.y7Zru9FwO42nOEpDGPuNC8XWqaA');