const prefix = require('discord-prefix');
module.exports = (client, message) => {
    let defaultPrefix = '!';

    let GuildPrefix2 = prefix.getPrefix(message.guild.id)
    if (GuildPrefix2 == null) GuildPrefix2 = default_prefix;
    if (!message.content.startsWith(GuildPrefix2)) return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(GuildPrefix2)) return;

    let guildPrefix = prefix.getPrefix(message.guild.id);
    if (!guildPrefix) guildPrefix = defaultPrefix;

    let args = message.content.slice(guildPrefix.length).split(' ');
    let command = args.shift().toLowerCase();
    let cmd = client.commands.get(command);
    if (!cmd) return;

    cmd.run(client, message, args);
};