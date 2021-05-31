const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    let target = message.mentions.users.first();
    if (!target)
        target = message.author;
    let avatarURL = target.displayAvatarURL({
        size: 4096,
        dynamic: true
    });
    const Embed = new Discord.MessageEmbed()
        .setAuthor(`${target.tag}'s Avatar`, target.displayAvatarURL())
        .setDescription(`[Avatar URL](${avatarURL})`)
        .setColor('#0e2b82')
        .setImage(avatarURL)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);

    message.channel.send(Embed);
}

module.exports.help = {
    name: "avatar"
}