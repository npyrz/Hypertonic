const Discord = require("discord.js");
const fs = require("fs");

//Gets JSON file
let jsonfile = JSON.parse(fs.readFileSync("./commend.json", "utf8"));
module.exports.run = async (bot, message, args) => {
    //Checks to see what user you want to check commends on
    let commenduser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    //Checks the JSON to see the commends on that user
    message.channel.send(`${commenduser} has ${jsonfile[commenduser.id].commends} Commends!`)
}

//Only way it wants to work with Hypertonic... politley fuck off
module.exports.help = {
    name: "checkcommends"
  }