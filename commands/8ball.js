var eightball = [
  "Yes",
  "No",
  "Maybe",
  "Probably",
  "There's a chance",
  "Never"
];
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  if (message.author.bot) return;
  if (args[1] != null) {
      message.reply(new Discord.MessageEmbed()
        .setDescription("**8Ball says... **"+eightball[Math.floor(Math.random() * eightball.length).toString(16)])
        .setColor("#0e2b82")
        .setThumbnail("https://cdn.discordapp.com/attachments/708353767233552498/821568954971324416/tenor.gif")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`));

  } else {
        message.channel.send(new Discord.MessageEmbed()
        .setDescription("Give me a question, I'll give you an answer!😉 `[prefix]8ball [QUESTION]`")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }));
  }
};
module.exports.help = {
name: '8ball'
}