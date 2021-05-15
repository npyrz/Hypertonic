const Discord = require("discord.js");

const ms = require('ms');

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Sorry, you don't have permission to reroll giveaways!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    if (!args[0]) {
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Sorry, you need to specify a valid message ID!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    let giveaway =
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
    if (!giveaway) {
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Sorry, couldn't find the giveaway!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    }
    client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Giveaway rerolled!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        })

        let embed = new Discord.MessageEmbed()
        .setTitle(`Giveaway Reroll`)
        .setColor("#0e2b82")
        .addField(`User who rerolled the giveaway:`, `<@${message.author.id}> ID: ${message.author.id}`)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    
      let sChannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
      if (!sChannel) return message.channel.send(new Discord.MessageEmbed()
      .setDescription("Please create a `bot-logs` channel first!")
      .setColor("#0e2b82")
      .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
      .then(m => m.delete({ timeout: 30000 }));
      sChannel.send(embed)

};
module.exports.help = {
    name: "giveawayreroll"
}