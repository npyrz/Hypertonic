const Discord = require("discord.js");
const ms = require('ms');
exports.run = (client, message, args) => {

  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.channel.send(new Discord.MessageEmbed()
  .setDescription('Please set an amount of time you would like your reminder to be! `[prefix]reminder [TIME][M-S-H]`')
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  

  if (validUnlocks.includes(time)) {
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true
    }).then(() => {
      message.channel.sendMessage(new Discord.MessageEmbed()
      .setDescription(`${message.author} your reminder has ended!`)
      .setColor("#0e2b82")
      .setThumbnail("https://cdn.discordapp.com/attachments/708353767233552498/821805236813430784/tenor_6.gif")
      .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true
    }).then(() => {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`${message.author} you have set a reminder for ${ms(ms(time), { long:true })}!`)
      .setColor("#0e2b82")
      .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
      .then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
          }).then(message.channel.send(new Discord.MessageEmbed()
          .setDescription(`${message.author} your reminder has ended!`)
          .setThumbnail("https://cdn.discordapp.com/attachments/708353767233552498/821805236813430784/tenor_6.gif")
          .setColor("#0e2b82")
          .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`)))
          .catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
};

module.exports.help = {
  name: "reminder"
}