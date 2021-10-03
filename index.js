const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = require("discord-prefix");
const bot = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true
});
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#0e2b82",
        reaction: "🎉"
    }
});
const { registerEvents } = require('./handlers/events');
registerEvents(bot, '../events');
client.config = config;

let statuses = ['🗯️!help🗯️', '🔑!cmds🔑', '🖥️discord.gg/8wBgDk3🖥️', '📌!setprefix📌', `📲!setlogs📲`, 'Default Prefix: !', 'Version 1.4.0', 'Partners: discord.gg/dQWyBmeRgr'];
setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setPresence({
        activity: {
            name: status
        },
        status: 'online'
    });
}, 5000)

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log(`Loading ${eventName} Event...`);
    });
});

client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loaded ${commandName}...`);
        client.commands.set(commandName, props);
    });
});

client.on('message', message => {
    if (message.content.startsWith("!prefix")) {
        let guildPrefix = prefix.getPrefix(message.guild.id);
        const embed = new Discord.MessageEmbed()
            .setColor("#0e2b82")
            .setDescription(`The default prefix for Hypertonic is \`\`!\`\` \nCurrent Server Prefix: \`\`${guildPrefix}\`\``)
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
        return message.channel.send({ embed })
    }
})

//XP Functions
const db = require('quick.db')
const Levels = require("discord-xp");

Levels.setURL("mongodb+srv://admin:HypertonicDiscordBot2021@hypertonicbot.5vhin.mongodb.net/hypertonic-xp-system");

client.on("message", async(message) => {
    const CurrentXP = db.get(`xp_toggle_${message.guild.id}`)
    if (!message.guild) return;
    if (message.author.bot) return;

    if (CurrentXP == 'off') {
        return;
    }

    if (CurrentXP == 'on') {
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            const LevelEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} has just leveled up to Level ${user.level}`)
                .setColor('#0e2b82')
                .setFooter('🔑Join https://discord.gg/8wBgDk3 for Support!🔑')
            message.channel.send(LevelEmbed);
        }
    } else {
        return;
    }
});

client.on("guildCreate", function(guild) {
    const ToSet = 'off'
    db.set(`xp_toggle_${guild.id}`, ToSet)
    prefix.setPrefix(`!`, guild.id)
    console.log(`Joined ${guild.name} and Set Prefix and XP`)
});

client.login(config.token);

