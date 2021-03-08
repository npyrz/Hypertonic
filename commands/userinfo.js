const Discord = require("discord.js")
let arr = new Array()

module.exports.run = async(bot, message, args) => {
    let mentions = message.mentions.members.first() || message.member;
    mentions.roles.cache.forEach(roles => `${arr.push(roles)}`)
    let user = message.mentions.users.first() || message.author;
    let uEmbed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setAuthor(`${user.tag}`, user.displayAvatarURL())
        .setThumbnail(`${user.displayAvatarURL()}`)
        .addField("**ID:**", `${user.id}`)
        .addField("**Last Message:**", `${user.lastMessage.content}`)
        .addField(
            "**Roles:**",
            arr.join(' , ')
        )
        .addField("**Status:**", user.presence.status, true)
        .addField("**Joined Server:**", `${mentions.joinedAt}`)
        .addField("**Registered Account:**", `${user.createdAt}`)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    message.channel.send(uEmbed);
}
module.exports.help = {
    name: "userinfo"
}