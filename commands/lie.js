const Discord = require('discord.js');
const word = ["is **Lying**", "has **Lied**", "is telling the **Truth**", "said the **Truth**"]
exports.run = async(client, message, args, tools) => {
    let thingtotest = args.join(" ");
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to lie detect!");
    var random = Math.floor(Math.random() * word.length);
    const lieword = word[random];
    const embed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle(`${message.mentions.users.first().username} ${lieword}`)
        .addField(`Question`, `${thingtotest}`)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({
        embed
    })
};
exports.help = {
    name: 'lie'
};