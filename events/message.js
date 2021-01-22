const botconfig = require("./../botconfig.json");
const fs = require("fs");
const CurrentTimers = new Map();



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



    let words = ['covid', 'virus', 'corona'];
    let foundInText = false;
    for (var i in words) {
        if (message.content.toLowerCase().includes(words[i].toLowerCase())) foundInText = true;
    }
    if (foundInText) {
        let botembed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setImage("https://cdn.discordapp.com/attachments/708353767233552498/719379861356937236/unknown.png")
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
        message.channel.send(botembed);
    }
};
