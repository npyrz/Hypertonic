const Discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find the user!").then(m => {m.delete(1000)});
    let kReason = args.join(" ").slice(22);
    if(!kReason) return message.channel.send("Please enter the reason for the kicked!").then(m => {m.delete(15000)});
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry that user can not be kicked!").then(m => {m.delete(10000)});
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      let role = message.guild.roles.find(`name`, "muted");
      let user = message.member
      user.addRole(role)
      return;
    }
   
 
    let kickEmbed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .addField("Kicked User", `${kUser} ID: ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .setFooter("Hypertonic Developers")
    .setTimestamp()
    .addField("Reason", kReason);
 
    let kickChannel = message.guild.channels.find(`name`, "bot-logs");
    if(!kickChannel) return message.channel.send("Can't find `bot-logs` channel");
 
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}
module.exports.help = {
  name:"kick"
}