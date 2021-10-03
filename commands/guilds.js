const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    try {
        client.guilds.cache.map(guild => {
            const OwnerName = guild.owner.user.tag
            const OwnerID = guild.owner.user.id

            if (OwnerName == null) {
                OwnerName = Unknown
            }

            console.log(`Name: **${guild.name}** | ID: **${guild.id}** | Owner: **${OwnerName}`)
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports.help = {
    name: "guilds"
}