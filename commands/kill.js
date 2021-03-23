const Discord = require('discord.js');
const randomP = ["https://media2.giphy.com/media/PnhOSPReBR4F5NT5so/source.gif",
    "https://media4.giphy.com/media/deaabWAgiawzyiMNZS/200.gif",
    "https://i.kym-cdn.com/photos/images/original/001/890/995/e1c.gif",
    "https://64.media.tumblr.com/903c2a018045d30ee024ceccd848afa7/tumblr_odr8auaRCy1vvecrwo1_500.gif",
    "https://media.tenor.com/images/054c0fadb9e3833a7bdcb08e2baf9ed5/tenor.gif",
    "https://i.makeagif.com/media/3-31-2018/y-2MYc.gif"
];
const word = ["shoots", "murders", "ends", "demolishes", "stabs", "stabs"]
module.exports.run = async(client, message, args, tools) => {

    if (!message.mentions.users.first()) return message.channel.send(new Discord.MessageEmbed()
    .setDescription("Sorry, you need to mention someone to kill them!")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    .then(m => m.delete({ timeout: 30000 }))
    

    var random = Math.floor(Math.random() * randomP.length);
    const killimg = randomP[random];
    const killterm = word[random];
    const embed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle(`${message.author.username} ${killterm} ${message.mentions.users.first().username}`)
        .setImage(killimg)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
    message.channel.send({
        embed
    })
};
module.exports.help = {
    name: 'kill'
}