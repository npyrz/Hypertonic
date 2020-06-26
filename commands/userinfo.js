const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let mentions = message.mentions.members.first() || message.member;
    let user = message.mentions.users.first() || message.author;
    let uEmbed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setAuthor(`${user.tag}`, user.displayAvatarURL)
        .setThumbnail(`${user.displayAvatarURL}`)
        .addField("**ID:**", `${user.id}`)
        .addField("**Last Message:**", `${user.lastMessage}`)
        .addField(
            "**Roles:**",
            mentions.roles.map(roles => `${roles}`).join(", "),
            true
        )
        .addField("**Status:**", user.presence.status, true)
        .addField("**Joined Server:**", `${mentions.joinedAt}`)
        .addField("**Registered Account:**", `${user.createdAt}`)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    message.channel.send({
        embed: uEmbed
    });
}
module.exports.help = {
    name: "userinfo"
}