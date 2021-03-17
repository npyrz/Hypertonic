const Discord = require('discord.js');
const ms = require('ms');
module.exports.run = (client, message, args) => {

  message.delete();

  const member =  message.guild.members.cache.get(args[0]);


  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.channel.send(new Discord.MessageEmbed()
  .setDescription('Please set an amount of time you would like the channel to be locked! `!lockdown [TIME][M-S]`')
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
        .addField("Lockdown By:", `<@${message.author.id}>`)
        .addField("Lockdown In:", message.channel)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();

        let channel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
        if (!channel) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Please create a `bot-logs` channel first!")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }));
        channel.send(muteembed);

      }).catch(error => {
        console.log(error);
      });
    });
  }
};

module.exports.help = {
  name: "lockdown"
}