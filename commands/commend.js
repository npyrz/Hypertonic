const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client, message, args) => {
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
                    .setDescription("Sorry, please mention the user you're trying to commend!")
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
                    .setDescription("Sorry, please add a reason to the commend that you are giving the user!")
                    .setColor("#0e2b82")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(m => m.delete({ timeout: 30000 }))

        }
        let commends = db.get(`commends_${message.guild.id}_${user.id}`)

        let CommendEmbed = new Discord.MessageEmbed()
            .setTitle("Commend")
            .setColor("#0e2b82")
            .addField("Commended User:", `${message.mentions.users.first().username} ID: ${message.mentions.users.first().id}`)
            .addField("Commended By:", `<@${message.author.username}> ID: ${message.author.id}`)
            .addField("Commend:", `${reason}`)
            .addField("Commended In:", message.channel)
            .addField("Total Number of Commends:", `#${db.get(`commends_${message.guild.id}_${message.mentions.users.first().id}`)+1}`)
            .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
            .setTimestamp()

  message.channel.send(new Discord.MessageEmbed()
  .setDescription(`${message.mentions.users.first().username} has been commended for ${reason}!`)
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

  let CommendEmbed1 = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
  if (!CommendEmbed1) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Please create a `bot-logs` channel first!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }));

    if (commends === null) {
        db.set(`commends_${message.guild.id}_${user.id}`, 1)
            user.send(new Discord.MessageEmbed()
            .setDescription(`You have been commended in **${message.guild.name}** for ${reason}`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    
        await message.channel.send(CommendEmbed1)
    } else if (commends !== null) {
        db.add(`commends_${message.guild.id}_${user.id}`, 1)
        user.send(new Discord.MessageEmbed()
        .setDescription(`You have been commended in **${message.guild.name}** for ${reason}`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        await message.channel.send(CommendEmbed1)
    }
}
module.exports.help = {
    name: "commend"
}
