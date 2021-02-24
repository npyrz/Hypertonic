const Discord = require("discord.js");
//Count Command Moved out of Index.js
module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;

    
    message.reply(
      `Hypertonic is on ${bot.guilds.cache.size} servers and serving ${bot.users.cache.length} members!`
    );
};

module.exports.help = {
name: 'count'
}
