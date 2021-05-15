const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(new Discord.MessageEmbed()
                    .setDescription("Sorry, you don't have permission to strike someone!")
                    .setColor("#0e2b82")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(m => m.delete({ timeout: 30000 }))
        }
        const user = message.mentions.members.first()
        if (!user) {
            return message.channel.send(new Discord.MessageEmbed()
                    .setDescription("Sorry, please mention the user you're trying to strike!")
                    .setColor("#0e2b82")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(m => m.delete({ timeout: 30000 }))

        }
        if (message.author.id === user.id) {
            return message.channel.send(new Discord.MessageEmbed()
                    .setDescription("Sorry, you can't strike yourself!")
                    .setColor("#0e2b82")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(m => m.delete({ timeout: 30000 }))

        }
        const reason = args.slice(1).join(" ")
        if (!reason) {
            return message.channel.send(new Discord.MessageEmbed()
                    .setDescription("Sorry, please add a reason to the strike that you are giving the user!")
                    .setColor("#0e2b82")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(m => m.delete({ timeout: 30000 }))

        }
        let strikes = db.get(`strikes_${message.guild.id}_${user.id}`)

        let CommendEmbed = new Discord.MessageEmbed()
            .setTitle("Strike")
            .setColor("#0e2b82")
            .addField("Striked User:", `${message.mentions.users.first().username} ID: ${message.mentions.users.first().id}`)
            .addField("Striked By:", `<@${message.author.username}> ID: ${message.author.id}`)
            .addField("Strike Reason:", `${reason}`)
            .addField("Striked In:", message.channel)
            .addField("Total Number of Strikes:", `#${db.get(`strikes_${message.guild.id}_${message.mentions.users.first().id}`)+1}`)
            .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
            .setTimestamp()

             message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${message.mentions.users.first().username} has been striked for ${reason}!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

             let embed = new Discord.MessageEmbed()
             .setTitle("Strike")
             .setColor("#0e2b82")
             .addField("Striked User:", `<@${message.mentions.users.first().id}> ID: ${message.mentions.users.first().id}`)
             .addField("Striked By:", `<@${message.author.id}> ID: ${message.author.id}`)
             .addField("Strike Reason:", `${reason}`)
             .addField("Striked In:", message.channel)
             .addField("Total Number of Strikes:", `${db.get(`strikes_${message.guild.id}_${message.mentions.users.first().id}`)+1}`)
             .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
             .setTimestamp()
    
      let sChannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
      if (!sChannel) return message.channel.send(new Discord.MessageEmbed()
      .setDescription("Please create a `bot-logs` channel first!")
      .setColor("#0e2b82")
      .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
      .then(m => m.delete({ timeout: 30000 }));
      sChannel.send(embed)

    }
module.exports.help = {
    name: "strike"
}