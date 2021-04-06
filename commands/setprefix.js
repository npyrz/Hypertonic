const Discord = require('discord.js');
const config = require('../botconfig.json')
const default_prefix = config.default_prefix
const db = require("quick.db")
exports.run = async(client, message, args, tools) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("You cannot change the Prefix in this server!")
    }

    if (!args[0]) {
        return message.channel.send("Please provide a Prefix to set!")
    }

    if (args[1]) {
        return message.channel.send("You cannot set a Prefix to a Double Argument!")
    }

    if (args[0].length > 3) {
        return message.channel.send("You cannot set a Prefix to more than 3 Characters!")
    }

    if (args.join("") === default_prefix) {
        db.delete(`prefix_${message.guild.id}`)
        return await message.channel.send("Reset Prefix ✅")
    }

    db.set(`prefix_${message.guild.id}`, args[0])
    await message.channel.send(`Set Prefix to **${args[0]}** for **${message.guild.name}**`)
};
module.exports.help = {
    name: 'setprefix'
}