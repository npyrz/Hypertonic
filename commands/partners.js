const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.MessageEmbed()
        .setTitle("**__Hypertonic Partners__**")
        .setColor("#0e2b82")
        .setDescription("**Pixel Survival Multiplayer** \n Hello! This is a friendly community that cannot wait to have you in the server. We have many perks for donators along with many free perks as soon as you join. We are a public community smp, and a public discord so feel free to join and hang out with us. We are constantly looking for new developers and staff! Feel free to come along!")
        .addField("Pixel Survival Multiplayer Discord Link:", "[Click Here](https://discord.gg/dQWyBmeRgr)")
        .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    message.channel.send(botembed);
}
module.exports.help = {
    name: "partners"
}
