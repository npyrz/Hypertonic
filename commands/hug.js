const Discord = require('discord.js');
const randomP = ["https://i.pinimg.com/originals/10/8c/22/108c2257683620292f4687262f26e872.gif",
    "https://media3.giphy.com/media/XAnTeL5MHLNpS/source.gif",
    "https://thumbs.gfycat.com/BriskSilkyClownanemonefish-small.gif",
    "https://media4.giphy.com/media/Lb3vIJjaSIQWA/source.gif",
    "http://giphygifs.s3.amazonaws.com/media/DsE2FPfuoqScg/giphy.gif",
    "https://i.pinimg.com/originals/f6/09/71/f6097105f1a4b3092729dc6883f2d18c.gif",
    "https://i.imgur.com/r9aU2xv.gif",
    "https://media3.giphy.com/media/AABkA1gzwu33a/giphy.gif"
];
module.exports.run = async(client, message, args, tools) => {

    if (!message.mentions.users.first()) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Incorrect Usage`)
    .setDescription("Correct Usage: ``hug [@USER]``")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    .then(m => m.delete({ timeout: 30000 }))
    

    var random = Math.floor(Math.random() * randomP.length);
    const hugimg = randomP[random];
    const embed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle(`${message.author.username} hugged ${message.mentions.users.first().username}`)
        .setImage(hugimg)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({
        embed
    })
};
module.exports.help = {
    name: 'hug'
};