const Discord = require("discord.js");
const canvacord = require('canvacord');
const Levels = require("discord-xp");
Levels.setURL("mongodb+srv://admin:HypertonicDiscordBot2021@hypertonicbot.5vhin.mongodb.net/hypertonic-xp-system");

module.exports.run = async(client, message, args) => {
    const target = message.mentions.users.first() || message.author;
    const user = await Levels.fetch(target.id, message.guild.id, true);

    const rank = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({ format: 'png', size: 512 }))
        .setCurrentXP(user.xp)
        .setRequiredXP(Levels.xpFor(user.level + 1))
        .setRank(user.position)
        .setLevel(user.level)
        .setStatus(target.presence.status)
        .setProgressBar("#0e2b82")
        .setUsername(target.username)
        .setDiscriminator(target.discriminator);

    rank.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
        });
};

module.exports.help = {
    name: 'rank'
}