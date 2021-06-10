const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db")

module.exports.run = async(client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Please set a logging channel with the \`\`setlogs\`\` command!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Sorry, you don't have permission to unmute!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!tomute) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Incorrect Usage`)
    .setDescription("Correct Usage: ``unmute [@NAME/ID]``")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    if (tomute.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Sorry, that user can not be unmuted!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    let muterole = message.guild.roles.cache.find(role => role.name === `Muted`);
    if (!muterole) {
        try {
            muterole = await message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                },
                reason: 'No prior mute role.'
            })
            message.guild.channels.cache.forEach(async(channel, id) => {
                await channel.updateOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
    if (!tomute.roles.cache.find(role => role.name === `Muted`)) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Sorry, this user is not muted!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    tomute.roles.remove(muterole.id).then(() => {
        tomute.send(new Discord.MessageEmbed()
            .setDescription("You've been unmuted")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${tomute} has been unmuted!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    })

    let muteembed = new Discord.MessageEmbed()
        .setTitle(`Unmute`)
        .setColor("#0e2b82")
        .addField("Muted User", `${tomute} ID: ${tomute.id}`)
        .addField("Unmuted By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    client.channels.cache.get(LoggingChannel).send(muteembed)

}

module.exports.help = {
    name: "unmute"
}