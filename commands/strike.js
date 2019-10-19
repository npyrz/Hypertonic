const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./strikes.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry you don't have permission to strike!").then(m => {m.delete(15000)});
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Can't find the user!").then(m => {m.delete(15000)});
  if(wUser.hasPermission("KICK_MEMBERS")) return message.reply("Sorry that user can not be striked!").then(m => {m.delete(15000)});
  let reason = args.join(" ").slice(22);
  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  warns[wUser.id].warns++;
  fs.writeFile("./strikes.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });
  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Strike")
  .setColor("#FF0000")
  .addField("Striked User", `<@${wUser.id}> ID:${wUser.id}`)
  .addField("Striked By", `<@${message.author.id}> ID: ${message.author.id}`)
  .addField("Striked In", message.channel)
  .addField("Number of Strikes", warns[wUser.id].warns)
  .setFooter("Nava Developers")
  .setTimestamp()
  .addField("Reason", reason);

  message.channel.send ("The user has been striked!!! Look in the <#633089917706043423> channel for more information!!!")
  let warnchannel = message.guild.channels.find(channel => channel.name === 'bot-logs');
  if(!warnchannel) return message.reply("Couldn't find the channel!");

  switch (warns[wUser.id].warns) {
    case 1:
    case 2:
     warnchannel.send(warnEmbed);
        break;

    case 3:
        warnchannel.send(warnEmbed);
        if(warns[wUser.id].warns == 3){
          let muterole = message.guild.roles.find(`name`, "muted");
          if(!muterole) return message.reply("Sorry, please notify server staff to create a role named `muted`!");
      
          let mutetime = "10800s";
          await(wUser.addRole(muterole.id));
          message.channel.send(`<@${wUser.id}> has been muted for 3 hours!`);
      
          setTimeout(function(){
            wUser.removeRole(muterole.id)
            message.reply(`<@${wUser.id}> has been unmuted!`)
          }, ms(mutetime))
        }
    break;
    case 4:
        warnchannel.send(warnEmbed);
      break;
    case 5:
        warnchannel.send(warnEmbed);
        if(warns[wUser.id].warns == 5){
          message.guild.member(wUser).kick(reason);
          message.reply(`<@${wUser.id}> has been kicked!`)
        }
        break;
        case 6:
            warnchannel.send(warnEmbed);
            break;
            case 7:
                warnchannel.send(warnEmbed);
                if(warns[wUser.id].warns == 7){
                  let muterole = message.guild.roles.find(`name`, "muted");
                  if(!muterole) return message.reply("Sorry, please notify server staff to create a role named `muted`!");
              
                  let mutetime = "25200s";
                  await(wUser.addRole(muterole.id));
                  message.channel.send(`<@${wUser.id}> has been muted for 7 hours!`);
              
                  setTimeout(function(){
                    wUser.removeRole(muterole.id)
                    message.reply(`<@${wUser.id}> has been unmuted!`)
                  }, ms(mutetime))
                  break;
                }
                  case 8:
                  case 9:
                   warnchannel.send(warnEmbed);
                  break;
                case 10:
                    if(warns[wUser.id].warns == 10){
                      message.guild.member(wUser).ban(reason);
                      message.reply(`<@${wUser.id}> has been banned`)
                    }
                  break;
  }
}
module.exports.help = {
  name: "strike"
}




