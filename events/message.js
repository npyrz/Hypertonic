const botconfig = require("./../botconfig.json");
const fs = require("fs");
const CurrentTimers = new Map();
const Discord = require("discord.js");


// You can not return in this as it will stop any other processes in the event, just do an if statement 
module.exports = async (bot, message) => {
    if(!message.channel.type === "dm") return;

    var prefix;
    if(!message.author.bot) {
        if(message.channel.type === "text") {
            try{
                prefix = botconfig.prefix;
                let messageArray = message.content.split(" ");
                let cmd = messageArray[0];
                let args = messageArray.slice(1);

                if (!CurrentTimers.get(message.guild.id)) {
                    CurrentTimers.set(message.guild.id, new Map());
                }

                if(message.content.startsWith(prefix)) {
                    let commandfile = bot.commands.get(cmd.slice(prefix.length));
                    if (commandfile) return commandfile.run(bot, message, args, CurrentTimers);
                }
            } catch(err) {
                console.log((err), `No prefix configuration setup for ${message.guild.name}`);
            }
        }
    }
};
