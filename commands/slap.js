const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let personToSlap = args.join(" ");
      const { body } = await superagent
      .get("https://nekos.life/api/v2/img/slap");
      
      const embed = new Discord.MessageEmbed()
      .setColor("#0e2b82")
      .setTitle(`${message.author.username} slapped ${personToSlap.id}!`)
      .setImage(body.url) 
      .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
      return message.channel.send({embed})
};
  
  exports.help = {
    name: 'slap',
  };