const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let strikes = JSON.parse(fs.readFileSync("./strikes.json", "utf8"));


module.exports.run = async (bot, message, args) => {

  //Checks for permissions on User
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command!");
  //Gets user that was @'ed
  let strikeduser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

  //Checks to make sure you arent warning yourself
  if (strikeduser === message.author) return message.channel.send("You can't warn yourself bud!")
  //Checks to see if that user is in the Server
  if (!strikeduser) return message.reply("Couldn't find the user.");
  //Gets a reason... if none then code stops
  let reason = args.join(" ").slice(22);
  if (!reason) return message.channel.send("Please provide a reason!")

  if (!strikes[strikeduser.id]) strikes[strikeduser.id] = {
    strikes: 0
  };

  //Writes to strikes.json to add a strike to the users ID
  strikes[strikeduser.id].strikes++;
  fs.writeFile("./strikes.json", JSON.stringify(strikes), (err) => {
    if (err) console.log(err)
  });

  //Sends Strike Embed
  let strikeEmbed = new Discord.MessageEmbed()
    .setTitle(`Successfully Striked ${strikeduser.user.tag} for${reason ? reason : "None."}`)
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`)
    .setColor("#fc6400")
    message.channel.send(strikeEmbed);
    strikeduser.send(strikeEmbed);
}

//Only way this bs works... fuck off pls
module.exports.help = {
  name: "strike"
}