const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async(client, message, args, tools) => {

    if (!message.mentions.users.first()) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Incorrect Usage`)
    .setDescription("Correct Usage: ``kiss [@USER]``")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    const { body } = await superagent
        .get("https://nekos.life/api/kiss");
    const embed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle(`${message.author.username} kissed ${message.mentions.users.first().username}`)
        .setImage(body.url)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({ embed })
};
module.exports.help = {
    name: 'kiss'
};