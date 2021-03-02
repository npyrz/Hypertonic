const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to kiss them!");
    if (message.mentions.users.first().id == "640305009325506581" && message.author.id != "148764657107075072") return message.channel.send(`DENIED | <@148764657107075072>, ${message.author} tried to kiss hannah!`)
    if (message.mentions.users.first().id == "148764657107075072" && message.author.id != "640305009325506581") return message.channel.send(`DENIED | <@640305009325506581>, ${message.author} tried to kiss tom!`)
    const { body } = await superagent
    .get("https://nekos.life/api/kiss");
    const embed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setTitle(`${message.author.username} kissed ${message.mentions.users.first().username} >:3`)
    .setImage(body.url) 
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({embed})
};
  exports.help = {
    name: 'kiss'
  };