const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async(client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)

    if (!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send(new Discord.MessageEmbed()
            .setColor("#0e2b82")
            .setDescription(`Sorry, you don't have permission to add emojis here!`)
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    if (!args.join(' ').match(/<a?:(\w{1,32}):(\d{17,19})>/g)) return message.channel.send(new Discord.MessageEmbed()
            .setColor("#0e2b82")
            .setDescription(`Please select some emojis to add! (Must be under 5)`)
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    const emojis = [...args.join(' ').matchAll(/<a?:(\w{1,32}):(\d{17,19})>/g)].map(s => [s[1], s[2]])
    if (emojis.length > 5) return message.channel.send(new Discord.MessageEmbed()
            .setColor("#0e2b82")
            .setDescription(`You can't add that many emojis, keep it under 5 at a time!`)
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    const created = []
    for (var e of emojis)
        created.push(await message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${e[1]}.png?v=1`, e[0]).catch(() => {}))
    message.channel.send(new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setDescription(`Created the following emojis: ${created.map(s => s.toString()).join(' ')}`))


    let muteembed = new Discord.MessageEmbed()
        .setTitle(`Create Emoji`)
        .setColor("#0e2b82")
        .addField("Emoji Created By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Emoji Created In:", message.channel)
        .addField("Emojis:", `${created.map(s => s.toString()).join(' ')}`)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    client.channels.cache.get(LoggingChannel).send(muteembed)
}
module.exports.help = {
    name: 'createemoji'
};