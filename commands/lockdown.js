const ms = require('ms');
exports.run = (client, message, args) => {
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('Please set an amount of time you would like the channel to be locked! `!lockdown [TIME][M-S]`').then(m => {
    m.delete({timeout: 10000})
  });
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you don't have permission to lockdown!").then(m => {
    m.delete({timeout: 10000})
  });
  if (validUnlocks.includes(time)) {
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.sendMessage('Lockdown lifted!');
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}!!!`).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send('Lockdown lifted!')).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
};


module.exports.help = {
  name: "lockdown"
}