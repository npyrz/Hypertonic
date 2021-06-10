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
            .setDescription("Sorry, you don't have permission to mute!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    let tomute = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Incorrect Usage`)
    .setDescription("Correct Usage: ``mute [@NAME/ID] [TIME] [REASON]``")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    if (tomute.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Sorry, that user can not be muted!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    let reason = args.slice(2).join(" ");
    if (!reason) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Incorrect Usage`)
    .setDescription("Correct Usage: ``mute [@NAME/ID] [TIME] [REASON]``")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`${tomute} has been muted!`)
        .setImage("https://cdn.discordapp.com/attachments/708353767233552498/821790407749795860/tenor_5.gif")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))


    let muterole = message.guild.roles.cache.find(role => role.name === `Muted`);
    if (!muterole) {
        try {
            muterole = await message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                },
                reason: `No Prior Mute Role.`
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
    let mutetime = args[1];
    if (!mutetime) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Please specify the amount of time you want the user to be muted!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    let muteembed = new Discord.MessageEmbed()
        .setTitle(`Mute`)
        .setColor("#0e2b82")
        .addField("Muted User:", `${tomute} ID: ${tomute.id}`)
        .addField("Muted By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Muted In:", message.channel)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp()
        .addField("Length", mutetime)
        .addField("Reason", reason);
    tomute.roles.add(muterole)
    client.channels.cache.get(LoggingChannel).send(muteembed)

    function callback(tomute) {
        return function() {
            tomute.roles.remove(muterole)
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`<@${tomute.id}> has been unmuted!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        }
    }
    setTimeout(callback(tomute), ms(mutetime));
}
module.exports.help = {
    name: "mute"
}