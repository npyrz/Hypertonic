const Discord = require('discord.js');
const superagent = require('superagent');
exports.run = async(client, message, args, tools) => {

    message.delete();

    const { body } = await superagent
        .get("https://official-joke-api.appspot.com/jokes/random");
    const embed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle(`${body.setup}`)
        .setDescription(`${body.punchline}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/708353767233552498/821762480614277196/tenor.gif")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({ embed })
};
exports.help = {
    name: 'joke'
};