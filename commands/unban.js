const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have permission to perform this command!")
    let bannedMember = await bot.fetchUser(args[0])
    if (!bannedMember) return message.channel.send("Please provide a user id to unban someone!")
    let reason = args.slice(1).join(" ")
    if (!reason) reason = "No reason given!"
    message.delete()
    try {
        message.guild.unban(bannedMember, {
            reason: reason
        })
        message.channel.send(`${bannedMember.tag} has been unbanned!`)
    } catch (e) {
        console.log(e.message)
    }

    let banEmbed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .addField("Unbanned User:", `${bannedMember} ID: ${bannedMember.id} `)
        .addField("Unbanned By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Reason:", reason)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();

    let sChannel = message.guild.channels.find(c => c.name === "bot-logs")
    sChannel.send(banEmbed);
}

module.exports.help = {
    name: "unban"
}