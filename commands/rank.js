const Discord = require("discord.js");
const Levels = require("discord-xp");
Levels.setURL("mongodb+srv://admin:HypertonicDiscordBot2021@hypertonicbot.5vhin.mongodb.net/hypertonic-xp-system");

module.exports.run = async(client, message, args) => {
    const target = message.mentions.users.first() || message.author;
    const user = await Levels.fetch(target.id, message.guild.id);
    const ErrorEmbed = new Discord.MessageEmbed()
        .setTitle(`:x: Error! Please mention a valid user!`)
        .setColor('#0e2b82')
    if (!user) return message.channel.send(ErrorEmbed);
    const SuccessEmbed = new Discord.MessageEmbed()
        .setDescription(`**${target.tag} is currently Level ${user.level}**`)
        .setColor('#0e2b82')
        .setFooter('🔑Join https://discord.gg/8wBgDk3 for Support!🔑')
    message.channel.send(SuccessEmbed);
};

module.exports.help = {
    name: 'rank'
}