const Discord = require('discord.js')
const { evaluate } = require('mathjs')

module.exports.run = async(client, message, args) => {
    try {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Calculator`)
            .addField(`Equation:`, args.join(' '))
            .addField(`Answer:`, evaluate(args.join(' ')))
            .setColor('BLUE')
        message.channel.send(embed)
    } catch (e) {
        message.reply(`Please supply a valid equation!`)
    }
}