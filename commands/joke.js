const Discord = require('discord.js');
const superagent = require('superagent');
exports.run = async(client, message, args, tools) => {
    const { body } = await superagent
        .get("https://official-joke-api.appspot.com/jokes/random");
    const embed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle(`${body.setup}`)
        .setDescription(`${body.punchline}`)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({ embed })
};
exports.help = {
    name: 'joke'
};