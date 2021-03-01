const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let personToCuddle = args.join(" ");
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/cuddle");
    const embed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setTitle(`${message.author.username} cuddles with ${personToCuddle}`)
    .setImage(body.url) 
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({embed})
};
  exports.help = {
    name: 'cuddle',
  };