const Discord = require('discord.js')
const { evaluate } = require('mathjs')

module.exports.run = async(client, message, args) => {
    try {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Calculator`)
            .addField(`Equation:`, args.join(' '))
            .addField(`Answer:`, evaluate(args.join(' ')))
            .setColor('#0e2b82')
        message.channel.send(embed)
    } catch (e) {
        message.channel.send(new Discord.MessageEmbed()
                .setDescription(`Incorrect Usage`)
                .setDescription("Correct Usage: ``calculator [EQUATION]``")
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
            .then(m => m.delete({ timeout: 30000 }));}
}