const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry you don't have permission to unmute!").then(m => {m.delete(15000)});
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Can't find the user!").then(m => {m.delete(15000)});
  if(tomute.hasPermission("MANAGE_ROLES")) return message.reply("Sorry that user can not be unmuted!").then(m => {m.delete(15000)});
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
    await tomute.send(`You've been unmuted!`)
 
  let muteembed = new Discord.RichEmbed()
  .setDescription(`Unmute`)
  .setColor("#FF0000")
  .addField("Muted User", tomute)
  .setFooter("Hypertonic Developers")
  .setTimestamp();


  let channel = message.guild.channels.find(channel => channel.name === 'bot-logs');
  if(!channel) return message.reply("Please create a `bot-logs`  channel first!");
  channel.send(muteembed);
  await(tomute.removeRole(muterole.id));
  setTimeout(function(){
    tomute.removeRole(muterole.id);
  });
}

module.exports.help = {
  name: "unmute"
}