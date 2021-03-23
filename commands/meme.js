const Discord = require("discord.js");
const { meme } = require('memejs');

module.exports.run = async (bot, message, args) => {

  if (message.author.bot) return;
  meme(function(err, result) {
    let embed = new Discord.MessageEmbed()
    .setImage(`${result.url}`)
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);

    message.channel.send(embed);
  });

};

module.exports.help = {
name: 'meme'
};