const prefix = require('discord-prefix');
module.exports = (client, message) => {
    const defaultPrefix = '!';
    let guildPrefix = prefix.getPrefix(message.guild.id)
    if (guildPrefix == null) guildPrefix = defaultPrefix;
    if (message.channel.type == "dm") return;
    if (!message.content.startsWith(guildPrefix)) return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(guildPrefix)) return;

    let args = message.content.slice(guildPrefix.length).split(' ');
    let command = args.shift().toLowerCase();
    let cmd = client.commands.get(command);
    if (!cmd) return;

    cmd.run(client, message, args);
};