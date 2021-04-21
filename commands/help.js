const Discord = require("discord.js");
const prefix = require("discord-prefix");

module.exports.run = async(bot, message, args) => {
    let guildPrefix = prefix.getPrefix(message.guild.id);
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle("Hypertonic Discord Bot")
        .setDescription(`Thanks for using Hypertonic, a multi-use discord not. The prefix for this server is \`\`${guildPrefix}\`\` and you can get a list of all our commands by using \`\`${guildPrefix}cmds\`\`. To view permissions on commands you can use \`\`${guildPrefix}modperms\`\`. For support regarding Hypertonic, you can join our Support Server by using \`\`${guildPrefix}support\`\`.`)
        .setImage("https://cdn.discordapp.com/attachments/633086365093068823/634963597759610900/tenor_3.gif")
        .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")

    message.channel.send(botembed);
}
module.exports.help = {
    name: "help"
}