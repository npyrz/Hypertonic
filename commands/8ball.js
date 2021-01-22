var eightball = [
  "Yes",
  "No",
  "Maybe",
  "Probably",
  "There's a chance",
  "Never"
];
const Discord = require("discord.js");
//8Ball Command moved to index.js
module.exports.run = async (bot, message, args) => {
  if (message.author.bot) return;
  if (args[1] != null) {
    message.reply(
      eightball[Math.floor(Math.random() * eightball.length).toString(16)]
    );
  } else {
    message.channel.send(
      "Give me a question, I'll give you an answer!😉 `!8ball [QUESTION]`"
    );
  }
};

module.exports.help = {
name: '8ball'
}