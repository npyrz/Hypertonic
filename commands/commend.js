const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client, message, args) => {
        const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
        if (!LoggingChannel) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Please set a logging channel with the \`\`setlogs\`\` command!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        }
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(new Discord.MessageEmbed()
                    .setDescription("Sorry, you don't have permission to commend someone!")
                    .setColor("#0e2b82")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(m => m.delete({ timeout: 30000 }))
        }
        const user = message.mentions.members.first()
        if (!user) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Incorrect Usage`)
            .setDescription("Correct Usage: ``commend [@NAME/ID] [REASON]``")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(m => m.delete({ timeout: 30000 }))

        }
        if (message.author.id === user.id) {
            return message.channel.send(new Discord.MessageEmbed()
                    .setDescription("Sorry, you can't commend yourself!")
                    .setColor("#0e2b82")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(m => m.delete({ timeout: 30000 }))

        }
        const reason = args.slice(1).join(" ")
        if (!reason) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Incorrect Usage`)
            .setDescription("Correct Usage: ``commend [@NAME/ID] [REASON]``")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(m => m.delete({ timeout: 30000 }))

        }
        let commends = db.get(`commends_${message.guild.id}_${user.id}`)

        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${message.mentions.users.first().username} has been commended for ${reason}!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

        let embed = new Discord.MessageEmbed()
            .setTitle("Commend")
            .setColor("#0e2b82")
            .addField("Commended User:", `<@${message.mentions.users.first().id}> ID: ${message.mentions.users.first().id}`)
            .addField("Commended By:", `<@${message.author.id}> ID: ${message.author.id}`)
            .addField("Commend:", `${reason}`)
            .addField("Commended In:", message.channel)
            .addField("Total Number of Commends:", `${db.get(`commends_${message.guild.id}_${message.mentions.users.first().id}`)+1}`)
            .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
            .setTimestamp()
      client.channels.cache.get(LoggingChannel).send(embed)
}
module.exports.help = {
    name: "commend"
}