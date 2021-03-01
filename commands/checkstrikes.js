const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

//Gets JSON file
let strikes = JSON.parse(fs.readFileSync("./strikes.json", "utf8"));
module.exports.run = async (bot, message, args) => {
    //Checks to see what user you want to check strikes on
    let strikeuser = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0])
    //Checks the JSON to see the strikes on that user
    message.channel.send(`${strikeuser} has ${strikes[strikeuser.id].strikes} Strikes!`)
}

//Only way it wants to work with Hypertonic... politley fuck off
module.exports.help = {
    name: "checkstrikes"
  }