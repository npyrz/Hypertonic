const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to slap them!");
      const { body } = await superagent
      .get("https://nekos.life/api/v2/img/slap");
      
      const embed = new Discord.MessageEmbed()
      .setColor("#0e2b82")
      .setTitle(`${message.author.username} slapped ${message.mentions.users.first().username}`)
      .setImage(body.url) 
      .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
      return message.channel.send({embed})
};
exports.help = {
  name: 'slap',
};
