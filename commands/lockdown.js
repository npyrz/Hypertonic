const Discord = require('discord.js');
const ms = require('ms');
const db = require("quick.db")

module.exports.run = (client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Please set a logging channel with the \`\`setlogs\`\` command!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    const member = message.guild.members.cache.get(args[0]);

    if (!client.lockit) client.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock'];
    if (!time) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Please set an amount of time you would like the channel to be locked! `[prefix]lockdown [TIME][M-S]`')
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Sorry, you don't have permission to lockdown!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    if (validUnlocks.includes(time)) {
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {
            message.channel.sendMessage(new Discord.MessageEmbed()
                .setDescription("Lockdown lifted!")
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
            console.log(error);
        });
    } else {
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Channel is now locked down for ${ms(ms(time), { long:true })}!`)
                    .setColor("#0e2b82")
                    .setImage("https://cdn.discordapp.com/attachments/708353767233552498/821774467255631962/tenor_4.gif")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(() => {

                    client.lockit[message.channel.id] = setTimeout(() => {
                        message.channel.updateOverwrite(message.guild.id, {
                                SEND_MESSAGES: null
                            }).then(message.channel.send(new Discord.MessageEmbed()
                                .setDescription(`Lockdown lifted!`)
                                .setColor("#0e2b82")
                                .setImage("https://cdn.discordapp.com/attachments/708353767233552498/821774449812045854/tenor_3.gif")
                                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`)))
                            .catch(console.error);
                        delete client.lockit[message.channel.id];
                    }, ms(time));

                    let muteembed = new Discord.MessageEmbed()
                        .setTitle(`Lockdown`)
                        .setColor("#0e2b82")
                        .addField("Lockdown By:", `<@${message.author.id}> ID: ${message.author.id}S`)
                        .addField("Lockdown In:", message.channel)
                        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
                        .setTimestamp();
                    client.channels.cache.get(LoggingChannel).send(muteembed)

                }).catch(error => {
                    console.log(error);
                });
        });
    }
};

module.exports.help = {
    name: "lockdown"
}