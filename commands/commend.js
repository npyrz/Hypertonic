const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let commends = JSON.parse(fs.readFileSync("./commend.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  message.delete();

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, you don't have permission to commend someone!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  let cUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (!cUser) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Sorry, can't find the user you're trying to commend!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  let reason = args.join(" ").slice(22);
  if (!commends[cUser.id]) commends[cUser.id] = {
    commends: 0
  };
  commends[cUser.id].commends++;
  fs.writeFile("./commend.json", JSON.stringify(commends), (err) => {
    if (err) console.log(err)
  });

  let commendEmbed = new Discord.MessageEmbed()
    .setTitle("Commend")
    .setColor("#0e2b82")
    .addField("Commended User:", `<@${cUser.id}> ID: ${cUser.id}`)
    .addField("Commended By:", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Commended In:", message.channel)
    .addField("Total Number of Commends:", commends[cUser.id].commends)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp()
    .addField("Reason:", reason);

  message.channel.send(new Discord.MessageEmbed()
  .setDescription(`${cUser} has been commended for ${reason}!`)
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

  let commendchannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
  if (!commendchannel) return message.channel.send(new Discord.MessageEmbed()
  .setDescription("Please create a `bot-logs` channel first!")
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }));

  switch (commends[cUser.id].commends) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      commendchannel.send(commendEmbed);
      break;
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
      commendchannel.send(commendEmbed);
      break;
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
      commendchannel.send(commendEmbed);
      break;
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
      commendchannel.send(commendEmbed);
      break;
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 48:
    case 49:
    case 50:
      commendchannel.send(commendEmbed);
      break;
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
    case 58:
    case 59:
    case 60:
      commendchannel.send(commendEmbed);
      break;
    case 61:
    case 62:
    case 63:
    case 64:
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
      commendchannel.send(commendEmbed);
      break;
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
      commendchannel.send(commendEmbed);
      break;
    case 81:
    case 82:
    case 83:
    case 84:
    case 85:
    case 86:
    case 87:
    case 88:
    case 89:
    case 90:
      commendchannel.send(commendEmbed);
      break;
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 97:
    case 98:
    case 99:
    case 100:
      commendchannel.send(commendEmbed);
      break;

  }
}
module.exports.help = {
  name: "commend"
}