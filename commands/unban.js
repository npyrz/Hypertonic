const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Sorry, you dont have permission to unban!`)
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    .then(m => m.delete({ timeout: 30000 }))

    
    let bannedMember = await message.guild.fetchBan(args[0])
    if (!bannedMember) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Please provide a user id to unban someone!`)
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    .then(m => m.delete({ timeout: 30000 }))
    

    let reason = args.slice(1).join(" ")
    if (!reason) reason = "No reason given"
    message.delete()
    try {
        message.guild.members.unban(bannedMember.user, {
            reason: reason
        })
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`${bannedMember.user} has been unbanned!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    } catch (e) {
        console.log(e.message)
    }

    let banEmbed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle("Unban")
        .addField("Unbanned User:", `${bannedMember.user} ID: ${bannedMember.user.id} `)
        .addField("Unbanned By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Reason:", reason)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();

        let sChannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
        if (!sChannel) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Please create a `bot-logs` channel first!")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }));
        sChannel.send(banEmbed)
}

module.exports.help = {
    name: "unban"
}