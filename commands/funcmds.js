const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete();

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
    .setTitle("**__😎Fun Commands😎__**")
    .setColor("#0e2b82")
    .setDescription("`dice` | `8ball` | `coinflip` | `nsfw` | `cuddle` | `kiss` | `slap` | `meme` | `hug` | `joke` | `kill` | `lie` | `rps`")
    .setFooter(message.createdAt)
    .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
  message.channel.send(botembed);
}
module.exports.help = {
  name: "funcmds"
}

