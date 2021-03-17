const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {

    message.delete();

    if (!message.mentions.users.first()) return message.channel.send(new Discord.MessageEmbed()
    .setDescription("Sorry, you need to mention someone to cuddle them!")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    .then(m => m.delete({ timeout: 30000 }))
    
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/cuddle");

    const embed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setTitle(`${message.author.username} cuddled ${message.mentions.users.first().username}`)
    .setImage(body.url) 
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({embed})
};
  exports.help = {
    name: 'cuddle'
  };