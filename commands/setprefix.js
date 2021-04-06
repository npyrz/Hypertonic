const Discord = require('discord.js');
const config = require('../botconfig.json')
const default_prefix = config.default_prefix
const db = require("quick.db")
exports.run = async(client, message, args, tools) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(new Discord.MessageEmbed()
                .setDescription("Sorry, you cannot change the prefix in this server!")
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
            .then(m => m.delete({ timeout: 30000 }))
    }

    if (!args[0]) {
        return message.channel.send(new Discord.MessageEmbed()
                .setDescription("Please provide a prefix to set!")
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
            .then(m => m.delete({ timeout: 30000 }))
    }


    if (args[1]) {
        return message.channel.send(new Discord.MessageEmbed()
                .setDescription("You cannot set a prefix to a double argument!")
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
            .then(m => m.delete({ timeout: 30000 }))
    }

    if (args[0].length > 3) {
        return message.channel.send(new Discord.MessageEmbed()
                .setDescription("Sorry, you cannot set a prefix to more than 3 characters!")
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
            .then(m => m.delete({ timeout: 30000 }))
    }

    if (args.join("") === default_prefix) {
        db.delete(`prefix_${message.guild.id}`)
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Reset Prefix ✅")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }

    db.set(`prefix_${message.guild.id}`, args[0])
    await message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Set prefix to **${args[0]}** for ${message.guild.name}`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
};


let embed = new Discord.MessageEmbed()
    .setTitle(`Set Prefix`)
    .setColor("#0e2b82")
    .addField('User Setting the Prefix:', `<@${message.author.id}>`)
    .addField(`Prefix:`, `${args[0]}`)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();

let sChannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
if (!sChannel) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Please create a `bot-logs` channel first!")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    .then(m => m.delete({ timeout: 30000 }));
sChannel.send(embed)

module.exports.help = {
    name: 'setprefix'
}
