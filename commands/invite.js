const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

  message.delete();

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
    .setColor("#0e2b82")
    .setDescription("If you're interested in inviting Hypertonic to a server use the link below. Also you can check out the Website and Support Server which is also linked!")
    .addField("Website Link:", "[Click Here](https://hypertonicdiscordbot.weebly.com/)")
    .addField("Support Server Link:", "[Click Here](https://discord.gg/VjCxgr2)")
    .addField("Discord Bot Invite Link:", "[Click Here](https://discordapp.com/oauth2/authorize?client_id=617784753482891316&permissions=8&scope=bot)")
    .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")

  message.channel.send(botembed);
}
module.exports.help = {
  name: "invite"
}