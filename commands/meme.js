const Discord = require("discord.js");
const { meme } = require('memejs');


module.exports.run = async (bot, message, args) => {
  if (message.author.bot) return;
  meme(function(err, result) {
    let embed = new Discord.MessageEmbed()
    .setDescription(`__**Heres your meme**__😉`)
    .setImage(`${result.url}`)
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send(embed);
  });

};

module.exports.help = {
name: 'meme'
};
