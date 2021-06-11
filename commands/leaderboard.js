const Discord = require("discord.js");
const Levels = require("discord-xp");
Levels.setURL("mongodb+srv://admin:HypertonicDiscordBot2021@hypertonicbot.5vhin.mongodb.net/hypertonic-xp-system");

module.exports.run = async(client, message, args) => {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
    if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
    const lb = leaderboard.map(e => `**Position #${e.position}:** <@${e.userID}> \n**Level:** ${e.level} \n**XP:** ${e.xp.toLocaleString()}`);

    const embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name} Leaderboard`)
        .setDescription(`${lb.join("\n\n")}`)
        .setColor('#0e2b82')
        .setFooter('🔑Join https://discord.gg/8wBgDk3 for Support!🔑')
    message.channel.send(embed)
};

module.exports.help = {
    name: 'leaderboard'
}