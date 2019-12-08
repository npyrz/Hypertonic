const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!").then(m => {m.delete(10000)});
    let bReason = args.slice(1).join(` `);
    if(!bReason) return message.channel.send("Please given a reason for the user to be banned!").then(m => {m.delete(15000)});
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry that user can not be banned!").then(m => {m.delete(10000)});
    if(!message.member.hasPermission("BAN_MEMBERS")) {
        let role = message.guild.roles.find(`name`, "muted");
        let user = message.member
        user.addRole(role)
        return;
      }
    let banEmbed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .addField("Banned User", `${bUser} ID: ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Banned In", message.channel)
    .setFooter("Hypertonic Developers")
    .setTimestamp()
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "bot-logs");
    if(!incidentchannel) return message.channel.send("Can't find `bot-logs` channel");

    message.guild.member(bUser).ban();
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}