const ms = require('ms');
exports.run = (client, message, args) => {
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('Please set an amount of time you would like your reminder to be! `!reminder [TIME][M-S-H]`').then(m => {
    m.delete(20000)
  });
  if (validUnlocks.includes(time)) {
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true
    }).then(() => {
      message.channel.sendMessage(`${message.author}**⏰⏰⏰YOUR REMINDER HAS __ENDED__!!!⏰⏰⏰**`);
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true
    }).then(() => {
      message.channel.send(`${message.author} **⌚⌚⌚YOU HAVE SET A REMINDER FOR __${ms(ms(time), { long:true })}__!!!⌚⌚⌚**`).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
          }).then(message.channel.send(`${message.author}**⏰⏰⏰YOUR REMINDER HAS __ENDED__!!!⏰⏰⏰**`)).catch(console.error);
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