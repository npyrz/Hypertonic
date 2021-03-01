const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let personToKiss = args.join(" ");
    const { body } = await superagent
    .get("https://nekos.life/api/kiss");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setTitle(`${message.author.username} kissed ${personToKiss}`)
    .setImage(body.url) 
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({embed})
};
  
  exports.help = {
    name: 'kiss',
  };