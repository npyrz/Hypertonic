const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry you don't have permission to mute!").then(m => {m.delete(15000)});
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Can't find the user!").then(m => {m.delete(15000)});
  if(tomute.hasPermission("MANAGE_ROLES")) return message.reply("Sorry that user can not be muted!").then(m => {m.delete(15000)});
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Please supply a reason for the user to be muted!").then(m => {m.delete(15000)});
  let muterole = message.guild.roles.find(`name`, "muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.reply("Please specify the amount of time you want the user to be muted!").then(m => {m.delete(15000)});
  message.delete().catch(O_o=>{});
  try{
    await tomute.send(`You've been muted for ${mutetime}!`)
 }catch(e){
   message.channel.send(`A user has been muted but their DMs are locked. They have been muted for ${mutetime}`).then(m => {m.delete(30000)});
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute`)
  .setColor("#FF0000")
  .addField("Muted User", tomute)
  .addField("Muted in", message.channel)
  .setFooter("Hypertonic Developers")
  .setTimestamp()
  .addField("Length", mutetime)
  .addField("Reason", reason);

  let channel = message.guild.channels.find(channel => channel.name === 'bot-logs');
  if(!channel) return message.reply("Please create a `bot-logs`  channel first!");
  channel.send(muteembed);
  await(tomute.addRole(muterole.id));
  setTimeout(function(){
    tomute.removeRole(muterole.id);
  }, ms(mutetime));
}
module.exports.help = {
  name: "mute"
}