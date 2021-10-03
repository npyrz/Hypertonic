const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const toleave = args[0];

    if (!toleave) return message.reply("You must supply a Guild ID");
    if (message.author.id != '395383087531425793')
        return message.reply("You don't have permission to use this command");

    client.guilds.cache.get(toleave).leave()
    message.channel.send(`Left ${toleave}`)

}

module.exports.help = {
    name: "leave"
}