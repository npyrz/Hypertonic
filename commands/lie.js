const Discord = require('discord.js');
const word = ["is **lying!**", "has **lied!**", "is telling the **truth!**", "said the **truth!**"]
module.exports.run = async(client, message, args, tools) => {

    let thingtotest = args.join(" ");
    if (!message.mentions.users.first()) return message.channel.send(new Discord.MessageEmbed()
    .setDescription("Sorry, you need to mention someone to lie detect them!")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    .then(m => m.delete({ timeout: 30000 }))
    

    var random = Math.floor(Math.random() * word.length);
    const lieword = word[random];
    const embed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle(`${message.mentions.users.first().username} ${lieword}`)
        .addField(`Question`, `${thingtotest}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/708353767233552498/821768898810478632/tenor_2.gif")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({
        embed
    })
};
module.exports.help = {
    name: 'lie'
};