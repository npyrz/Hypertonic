const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send(new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setDescription(`You can\'t add Emojis here!`)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    if (!args.join(' ').match(/<a?:(\w{1,32}):(\d{17,19})>/g)) return message.channel.send(new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setDescription(`Please add some Emojis to add! (Under 5)`)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    const emojis = [...args.join(' ').matchAll(/<a?:(\w{1,32}):(\d{17,19})>/g)].map(s => [s[1], s[2]])
    if (emojis.length > 5) return message.channel.send(new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setDescription(`You can't add that many sorry, keep it under 5 at a time! :)`)
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

    const created = []
    for (var e of emojis)
        created.push(await message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${e[1]}.png?v=1`, e[0]).catch(() => {}))
    message.channel.send(new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setDescription(`Created the following emojis: ${created.map(s => s.toString()).join(' ')}`))
}
exports.help = {
    name: 'stealemoji'
};